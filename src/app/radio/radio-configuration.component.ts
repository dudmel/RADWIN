import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { RadioService } from './radio.service';
import { IRadioModel } from './radio.model';
import { Consts } from '../shared';
import { Resources, exLog } from '../shared';
import { AppStore, UnitsPipe, minMaxNumberValidator, WModalService } from '../blocks';
import { IMonitorModel } from '../monitor';
import { ChangeBandService } from './change-band';
import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'radio-configuration',
  template: require('./radio-configuration.component.html'),
  styles: [require('./radio.styles.scss')]
})

export class RadioConfigurationComponent implements OnInit, OnDestroy {
  private form: FormGroup;
  private radio: IRadioModel;
  private eirp: number;
  private monitor: any;
  private canChangeSectorId1: boolean;
  private canChangeSectorId2: boolean;
  private linkOff: boolean;
  private radioSub;
  private monitorSub;
  private mobilityLevels: number[];
  private isLinkSynchronized: boolean;
  private isAtpcEnabled: boolean;
  // private mask = [/[1-9]/, /[1-9]/, /[1-9]/, '.', /[1-9]/];
  // [textMask]="{mask: mask}"

  constructor(private _radioService: RadioService,
    private _modalService: WModalService,
    private _changeBandService: ChangeBandService,
    private _store: Store<AppStore>,
    private _formBuilder: FormBuilder) {
    this.initializeForm();
  }

  save() {
    exLog('Saving Radio Form Value: ', this.form.value);
    if (!this.form.valid) {
      return Observable.fromPromise(Promise.resolve(this._modalService.activate("Configuration is invalid", "Radio configuration", "OK", "", Consts.ModalType.error)));
    }

    if (this.form.controls['currentCbw'].dirty) {
      let warningMessage = this.linkOff 
        ? "You are about to change Channel Bandwidth. \nUnsynchronized HSUs will not be updated and will not be able to resynchronize."
        : "You are about to change Channel Bandwidth.";
      this._modalService.activate(warningMessage, Resources.warning, undefined, undefined, Consts.ModalType.warning)
        .then(responseOk => {
          if (!responseOk) 
            return;
          this.setFormData();
          }); 
    }
    this.setFormData();
  }
  
  setFormData() {
    let dirtyForm: IRadioModel = <IRadioModel>{};
    for (let control in this.form.controls) {
      if (this.form.controls[control].dirty) {
        dirtyForm[control] = this.form.controls[control].value;
        if (this.form.controls['sectorId1'].value != undefined && this.form.controls['sectorId2'].value != undefined)
          dirtyForm.sectorId = '' + this.form.controls['sectorId1'].value + this.form.controls['sectorId2'].value
      }
      exLog(dirtyForm.sectorId);
    }
    this._radioService.setData(dirtyForm);
    if (this.form.controls['sectorId1'].dirty || this.form.controls['sectorId2'].dirty)
      this._radioService.resync();

    this.form.reset();
  }

  cancel() {
    this.getRadio();
    this.form.reset();
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.form || !this.form.dirty) {
      return true;
    }
    // Ask User
    return Promise.resolve(this._modalService.activate());
  }

  ngOnInit() {
    // console.log(this.form);
    exLog('hello Radio Configuration Component');

    this.monitorSub = this._store.select('monitor')
      .subscribe((monitor: IMonitorModel) => {
        this.monitor = monitor;
        this.canChangeSectorId1 = monitor.hsuLinkState === 'Not Synchronized' || monitor.hsuLinkState === 'Active Unregistered';
        this.canChangeSectorId2 = this.form.controls['sectorId1'].valid;
        this.linkOff = monitor.hsuLinkState === 'Not Synchronized';
        this.isAtpcEnabled = monitor.atpcStstus && monitor.atpcStstus != 'Off';
       

        // this.linkOff = monitor.hsuLinkState === Consts.linkStates.linkOff;
        if (!this.linkOff) {
          this.form.controls['currentCbw'].disable();
          this.form.controls['mobilityLevels'].disable();
        } else {
          this.form.controls['currentCbw'].enable();
          this.form.controls['mobilityLevels'].enable();
        }

        if (this.isAtpcEnabled)
          this.form.controls['desiredTxPower'].disable();
        else
          this.form.controls['desiredTxPower'].enable();

          this.calculateEirp();
          if (!this.canChangeSectorId2) this.form.controls['sectorId2'].disable();
      });

    this.radioSub = this._store.select('radio')
      .subscribe((radio: IRadioModel) => {
        this.radio = radio;
        //this.calculateEirp();
      });

    this.isLinkSynchronized = true;

    this.getRadio();
  }

  ngOnDestroy() {
    this.radioSub.unsubscribe();
    this.monitorSub.unsubscribe();
  }

  initializeForm() {
    this.mobilityLevels = [1, 2, 3, 4];

    this.form = this._formBuilder.group({
      sectorId1: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
      sectorId2: ['', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(20)])],
      antennaGain: [''],
      desiredTxPower: ['', minMaxNumberValidator(-8, 25)],
      currentCbw: [''],
      mobilityLevels: ['']
    });

    if (this.form.controls['antennaGain']) {
      this.form.controls['antennaGain'].valueChanges.subscribe(
        (value: number) => {
          this.calculateEirp();
        }
      );
    }
  }

  calculateEirp() {
    if (this.radio == undefined) {
      return;
    }
     if (this.monitor == undefined || this.monitor.configMonitor == undefined) {
      return;
     }
      
      this.eirp = this.monitor.configMonitor.totalTxPower + this.radio.antennaGain + this.radio.cableLoss / 10;
  }

  private getRadio() {
    this._radioService.getData();
    this._changeBandService.getData();
  }

  private _canChangeSectorId2(sector1Value: string) {
    if (sector1Value.length == 4) this.form.controls['sectorId2'].enable();
  }
}
