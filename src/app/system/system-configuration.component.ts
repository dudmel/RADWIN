import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { WModalService } from '../blocks';
import { SystemService } from './system.service';
import { ISystemModel } from './system.model';
import { IMonitorModel } from '../monitor';
import { Resources, exLog } from '../shared';
import { AppStore, ip4Validator, restrictedCharsValidator, ntpServerValidator } from '../blocks';
import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'system-configuration',
  template: require('./system-configuration.component.html'),
  styles: [require('./system.styles.scss')]
})

export class SystemConfigurationComponent implements OnInit, OnDestroy {
  private form: FormGroup;
  private system: ISystemModel;
  private monitor: IMonitorModel;
  private systemSub;
  private monitorSub;

  constructor(private _systemService: SystemService,
              private _store: Store<AppStore>,
              private _modalService: WModalService,
              private _formBuilder: FormBuilder) {

    this.form = _formBuilder.group({
                hsuName: ['', Validators.compose([Validators.required, restrictedCharsValidator])],
                hsuLocation: ['', Validators.compose([Validators.required, restrictedCharsValidator])],
                hsuContact: ['', Validators.compose([Validators.required, restrictedCharsValidator])],
                ntpServer: ['', ntpServerValidator],
                ntpTimeOffsetFromUTC: ['']
            });
  }

  save() {
    let dirtyForm: ISystemModel = <ISystemModel>{};
    for (let control in this.form.controls) {
      if (this.form.controls[control].dirty) {
        dirtyForm[control] = this.form.controls[control].value;
      }
    }

    this._systemService.setData(dirtyForm);
    this.form.reset();
  }

  cancel() {
    this.getSystem();
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
    // exLog('hello System Configuration Component');

    this.systemSub = this._store.select('system')
          .subscribe((system: ISystemModel) => {
              this.system = system;
            });

    this.monitorSub = this._store.select('monitor')
          .subscribe((monitor: IMonitorModel) => {
              this.monitor = monitor;
            });

    this.getSystem();
  }

  ngOnDestroy() {
    this.systemSub.unsubscribe();
    this.monitorSub.unsubscribe();
  }

  private getSystem() {
    this._systemService.getData();
  }

}

