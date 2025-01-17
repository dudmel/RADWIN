import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { WifiService } from './wifi.service';
import { IWifiModel } from './wifi.model';
import { IMonitorModel } from '../monitor';
import { exLog } from '../shared/global-methods';
import { AppStore, WModalService, ip4Validator, minMaxNumberValidator, wifiIpValidator } from '../blocks';
import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'wifi-configuration',
  providers: [WifiService],
  styles: [require('./wifi.styles.scss')],
  template: require('./wifi-configuration.component.html')
})

export class WifiConfigurationComponent implements OnInit, OnDestroy {
  private form: FormGroup;
  private wifi: IWifiModel;
  private monitor: IMonitorModel;
  private wifiSub;
  private monitorSub;
  private isUnregistered: boolean;

  constructor(private _wifiService: WifiService,
              private _store: Store<AppStore>,
              private _modalService: WModalService,
              private _formBuilder: FormBuilder) {

    this.form = _formBuilder.group({
      wifiMode: [''],
      wifiChannel: ['', minMaxNumberValidator(1, 11)],
      wifiTxPower: ['', minMaxNumberValidator(1, 17)],
      wifiPassword: ['', Validators.compose([Validators.minLength(8), Validators.maxLength(30)])],
      wifiNetwork: ['', Validators.compose([ip4Validator, wifiIpValidator])]
    });

    this.isUnregistered = true;
  }
  
  save() {

    let dirtyForm: IWifiModel = <IWifiModel>{};
    for (let control in this.form.controls) {
      if (this.form.controls[control].dirty) {
        dirtyForm[control] = this.form.controls[control].value;
      }
    }

    this._wifiService.setData(dirtyForm);
    this.form.reset();
  }

  cancel() {
    this.getWifi();
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

    this.wifiSub = this._store.select('wifi')
      .subscribe((wifi: IWifiModel) => {
        this.wifi = wifi;
        this.form.controls['wifiPassword'].setValue('********');
      });

    this.monitorSub = this._store.select('monitor')
      .subscribe((monitor: IMonitorModel) => {
        this.monitor = monitor;
        this.isUnregistered = monitor.hsuLinkState === 'Active Unregistered';

        this.udateSwitchStatus()
      });

    this.getWifi();
  }

  ngOnDestroy() {
    this.wifiSub.unsubscribe();
    this.monitorSub.unsubscribe();
  }

  private getWifi() {
    this._wifiService.getData();
  }

  private udateSwitchStatus() {
      if (this.isUnregistered)
        this.form.controls['wifiMode'].disable();
      else
        this.form.controls['wifiMode'].enable();
  }
}
