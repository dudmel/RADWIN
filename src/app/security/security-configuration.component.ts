import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { SecurityService } from './security.service';
import { ISecurityModel } from './security.model';
import { OperationsService } from '../tools/operations/operations.service';
import { IMonitorModel } from '../monitor';
import { exLog, Resources, Consts } from '../shared';
import {
  AppStore, WModalService, ip4Validator,
  invalidPasswordValidator, matchingPasswordsValidator
} from '../blocks'; 
import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'security-configuration',
  providers: [SecurityService, OperationsService],
  template: require('./security-configuration.component.html'),
  styleUrls: ['./security.component.scss']
})

export class SecurityConfigurationComponent implements OnInit, OnDestroy {
  private linkPasswordForm: FormGroup;
  private security: ISecurityModel;
  private _isChangeLinkPasswordEnabled: boolean;
  private monitorSub;

  constructor(private _securityService: SecurityService,
    private _modalService: WModalService,
    private _operationsService: OperationsService,
    private _store: Store<AppStore>,
    private _formBuilder: FormBuilder) {

    this.linkPasswordForm = _formBuilder.group({
      matchingPasswords: this._formBuilder.group({
        newPassword: [{value: '', disabled: !this._isChangeLinkPasswordEnabled}, Validators.compose([Validators.required, invalidPasswordValidator, Validators.minLength(8)])],
        confirmPassword: [{value: '', disabled: !this._isChangeLinkPasswordEnabled}, Validators.compose([Validators.required, invalidPasswordValidator, Validators.minLength(8)])],
      }, { validator: matchingPasswordsValidator }),
      currentPassword: [{value: '', disabled:  !this._isChangeLinkPasswordEnabled}, Validators.compose([Validators.required, invalidPasswordValidator])],
    });
  }

  save() {
    exLog('Security Form Value: ', this.linkPasswordForm.value);

    let dirtyForm: ISecurityModel = <ISecurityModel>{};
    dirtyForm.currentPassword = this.linkPasswordForm.controls['currentPassword'].value;
    dirtyForm.newPassword = this.linkPasswordForm.controls['matchingPasswords'].value['newPassword'];

    this._securityService.setData(dirtyForm)
      .subscribe((response: any) => {
        let p;
        if (response && response.message) {
          p = Promise.resolve(this._modalService.activate(Resources.changeLinkPasswordSuccess, 'Link Password'));
          this._operationsService.resync().subscribe();
        } else {
          p = Promise.resolve(this._modalService.activate(Resources.changeLinkPasswordFailure, 'Link Password'));
        }
        return Observable.fromPromise(p);
      });
  }

  cancel() {
    this.linkPasswordForm.reset();
  }

  canDeactivate(): Promise<boolean> | boolean {
    if (!this.linkPasswordForm || !this.linkPasswordForm.dirty) {
      return true;
    }
    // Ask User
    return Promise.resolve(this._modalService.activate());
  }
  ngOnInit() {
      this.monitorSub = this._store.select('monitor')
      .subscribe((monitor: IMonitorModel) => {
        if (monitor.hsuLinkState === 'Not Synchronized' || monitor.hsuLinkState === 'Active Authentication Error') {
          this.linkPasswordForm.controls['currentPassword'].enable();
          this.linkPasswordForm.controls['matchingPasswords'].enable();
        }
        else {
          this.linkPasswordForm.controls['currentPassword'].disable();
          this.linkPasswordForm.controls['matchingPasswords'].disable();
        }
            
    });
  }

  ngOnDestroy() {
    this.monitorSub.unsubscribe();
  }

  isChangeLinkPasswordDisabled() {
    return !this._isChangeLinkPasswordEnabled;
  }

}
