import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { RadioService } from './radio.service';
import { IRadioModel } from './radio.model';
import { Consts } from '../shared';
import { exLog } from '../shared/global-methods';
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
  private canChangesectorId: boolean;
  private linkOff: boolean;
  private radioSub;
  private monitorSub;
  private mobilityLevels: number[];
  private isLinkSynchronized: boolean;
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
    exLog('Radio Form Value: ', this.form.value);

    let dirtyForm: IRadioModel = <IRadioModel>{};
    for (let control in this.form.controls) {
      if (this.form.controls[control].dirty) {
        dirtyForm[control] = this.form.controls[control].value;
      }
    }

    this._radioService.setData(dirtyForm);
    this.form.reset();
  }

  cancel() {
    this.getRadio();
    this.form.reset();
  }

  canDeactivate(): any {
    if (!this.form || !this.form.dirty) {
      return true;
    }
    // Ask User
    return Observable.fromPromise(Promise.resolve(this._modalService.activate()));
  }

  ngOnInit() {
    exLog('hello Radio Configuration Component');

    this.monitorSub = this._store.select('monitor')
      .subscribe((monitor: IMonitorModel) => {
        this.monitor = monitor;
        this.canChangesectorId =  monitor.hsuLinkState === 'Not Synchronized' ||
                                  monitor.hsuLinkState === 'Active Unregistered';
        this.linkOff = monitor.hsuLinkState === 'Not Synchronized';

        // this.linkOff = monitor.hsuLinkState === Consts.linkStates.linkOff;
        if (!this.linkOff) {
          this.form.controls['currentCbw'].disable();
          this.form.controls['mobilityLevels'].disable();
        } else {
          this.form.controls['currentCbw'].enable();
          this.form.controls['mobilityLevels'].enable();
        }
      });

    this.radioSub = this._store.select('radio')
      .subscribe((radio: IRadioModel) => {
        this.radio = radio;
        this.calculateEirp();
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
      sectorId: ['', Validators.compose([Validators.minLength(4), Validators.maxLength(24)])],
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
    if (this.radio !== undefined && this.monitor.configMonitor !== undefined) {
      this.eirp = this.monitor.configMonitor.totalTxPower + this.radio.antennaGain + this.radio.cableLoss / 10;
    }
  }

  private getRadio() {
    this._radioService.getData();
    this._changeBandService.getData();
  }
}
