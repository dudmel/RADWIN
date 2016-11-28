import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { WModalService } from '../blocks';
import { NetworkService } from './network.service';
import { TrapsDestinationsService } from './traps-destinations.service';
import { INetworkModel, ITrapDestination } from './network.model';
import { Resources, exLog } from '../shared';
import { AppStore, ip4Validator, ipParamsValidator, minMaxNumberValidator } from '../blocks';
import { TrapComponent } from './trap-destination.component';
import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'network-configuration',
  template: require('./network-configuration.component.html'),
  styles: [require('./network.styles.scss')]
})

export class NetworkConfigurationComponent implements OnInit, OnDestroy {
  private form: FormGroup;
  private network: INetworkModel;
  private initialNetworkData: INetworkModel;
  private traps: ITrapDestination[];
  private clonedTraps: ITrapDestination[];
  private isVlanEnabled: boolean;
  private crcDecreaser: number;
  private crcCounterPresenter: number;
  private trapIndex: number;
  private vlanId: number;
  private vlanPriority: number;
  private networkSub;
  private crcSub;
  private trapsSub;

  constructor(private _networkService: NetworkService,
    private _modalService: WModalService,
    private _store: Store<AppStore>,
    private _trapsService: TrapsDestinationsService,
    private _formBuilder: FormBuilder) {

    this.form = _formBuilder.group({
      ipParams: this._formBuilder.group({
        hsuDefaultGateway: ['', Validators.compose([Validators.required, ip4Validator])],
        hsuSubnetMask: ['', Validators.compose([Validators.required, ip4Validator])],
        hsuIp: ['', Validators.compose([Validators.required, ip4Validator])]
      }, { validator: ipParamsValidator }),
      currentPortState: [''],
      desiredPortState: [''],
      vlanId: ['', minMaxNumberValidator(1, 4094)],
      vlanPriority: ['', minMaxNumberValidator(0, 7)]
    });

  }

  changeTrapIndex(index: number) {
    this.trapIndex = index;
  }

  isActive(index: number): boolean {
    return this.trapIndex === index;
  }

  save() {
    let dirtyNetworkForm: INetworkModel = <INetworkModel>{};

    for (let control in this.form.controls) {
      if (this.form.controls[control].dirty) {
        dirtyNetworkForm[control] = this.form.controls[control].value;
      }
    }

    if (dirtyNetworkForm.ipParams) {
      this._modalService.activate(Resources.changeIpParamsWarning, Resources.warning)
        .then(responseOk => {
          if (responseOk) {
            this.initialNetworkData.ipParams.hsuIp = this.network.ipParams.hsuIp;
            this.initialNetworkData.ipParams.hsuSubnetMask = this.network.ipParams.hsuSubnetMask;
            this.initialNetworkData.ipParams.hsuDefaultGateway = this.network.ipParams.hsuDefaultGateway;

            this._networkService.setData(this.initialNetworkData);

            let newIp = window.location.protocol + '//' + dirtyNetworkForm.ipParams.hsuIp;
            window.location.href = newIp;
          }
        });

      return;
    }

    if (this.isVlanEnabledByUser()) {
      this._modalService.activate(Resources.changeMngVlanWarning, Resources.warning)
        .then(responseOk => {
          if (!responseOk) { return; }
        });
    }

    // Check if traps are dirty
    if (this.trapsAreDirty()) {
      this._trapsService.setData(this.clonedTraps);
    }
    this._networkService.setData(dirtyNetworkForm);
    this.form.reset();
  }

  trapsAreDirty(): boolean {
    return !(JSON.stringify(this.traps) === JSON.stringify(this.clonedTraps));
  }

  cancel() {
    this.getNetwork();
    this.form.reset();
  }

  canDeactivate(): any {
    if (!this.form || !this.form.dirty) {
      return true;
    }
    // Ask User
    return Observable.fromPromise(Promise.resolve(this._modalService.activate()));
  }

  ngOnDestroy() {
    this.networkSub.unsubscribe();
    this.crcSub.unsubscribe();
    this.trapsSub.unsubscribe();
  }

  ngOnInit() {
    this.trapIndex = 0;
    exLog('hello Network Configuration Component');

    this.crcSub = this._store.select('crcDecreaser').subscribe((s: number) => this.crcDecreaser = s);

    this.networkSub = this._store.select('network')
      .subscribe((network: INetworkModel) => {
        this.initialNetworkData = network;
        this.network = network;
        this.crcCounterPresenter = network.crcErrors - this.crcDecreaser;
        this.vlanId = network.vlanId;
        this.vlanPriority = network.vlanPriority;
        this.isVlanEnabled = this.isInitialVlanEnabled();
      });


    this.trapsSub = this._store.select('traps')
      .subscribe((traps: ITrapDestination[]) => {
        this.traps = traps;
        this.clonedTraps = JSON.parse(JSON.stringify(traps));
      });

    this.getNetwork();

  }

  isInitialVlanEnabled() {
    return this.network.vlanId !== 0 && this.network.vlanPriority !== 0;
  }

  isVlanEnabledByUser() {
    return this.isVlanEnabled && !this.isInitialVlanEnabled();
  }

  private ClearCrcCounter() {
    this._store.dispatch({ type: 'SET_CRC_DECREASER', payload: this.network.crcErrors })
    this.crcCounterPresenter = 0;
  }

  private getNetwork() {
    this._networkService.getData();
    this._trapsService.getData();
  }

  private isFormDisabled() {
    // if (this.isVlanEnabled === true) {
    //   // Check all 
    //   return !this.form.valid || this.form.pristine;
    // } else {
    //   // Skip vlan 
    //   return !this.form.controls['ipParams'].valid || !this.form.controls['currentPortState'].valid;
    // }

    return false;
  }

  private vlanCheckBoxClicked() {
    this.isVlanEnabled = !this.isVlanEnabled;

    if (this.isVlanEnabled === true) {
      this.vlanId = this.network.vlanId;
      this.vlanPriority = this.network.vlanPriority;
    } else {
      this.vlanId = 0;
      this.vlanPriority = 0;
    }
  }

}
