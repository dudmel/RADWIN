import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { NetworkToolsService } from './network-tools.service';
import { SpeedTestService } from './speed-test.service';
import { INetworkToolsModel } from './network-tools.model';
import { WModalService, GaugeComponent } from '../../blocks';
import { Resources, exLog } from '../../shared';
import { AppStore, ip4Validator, minMaxNumberValidator } from '../../blocks';

let emptyResult = '';

@Component({
    selector: 'tools-network',
    providers: [NetworkToolsService, SpeedTestService],
    template: require('./network-tools.component.html'),
    styleUrls: ['./network-tools.scss']
})

export class NetworkToolsComponent implements OnInit, OnDestroy {
    private ipNetworkTools: INetworkToolsModel = <INetworkToolsModel>{};
    private traceNetworkTools: INetworkToolsModel = <INetworkToolsModel>{};
    private form: FormGroup;
    private traceform: FormGroup;
    private pingInProgress: boolean;
    private traceInProgress: boolean;
    private speedTestInProgress: boolean;
    private speedTestData;
    private speedTestSub;

    constructor(private _networkToolsService: NetworkToolsService,
                private _speedTestService: SpeedTestService,
                private _store: Store<AppStore>,
                private _formBuilder: FormBuilder,
                private _modalService: WModalService) {

        this.form = _formBuilder.group({
            ip: ['', Validators.compose([Validators.required, ip4Validator])],
            packetCount: ['5', Validators.compose([Validators.required, minMaxNumberValidator(1, 30)])],
            packetSize: ['5', Validators.compose([Validators.required, minMaxNumberValidator(0, 65535)])]
        });

        this.traceform = _formBuilder.group({
            ip: ['', Validators.compose([Validators.required, ip4Validator])]
        });

        this.pingInProgress = false;
        this.speedTestInProgress = false;
        this.traceInProgress = false;
    }

    ping() {
        this.clearResults();
        this.pingInProgress = true;
        this._networkToolsService.ping(this.form.value)
            .subscribe((networkTools: any) => {
                this.pingInProgress = false;
                this.ipNetworkTools = <INetworkToolsModel>(networkTools);
            });
    }

    trace() {
        this.clearResults();
        this.traceInProgress = true;
        this._networkToolsService.trace(this.traceform.value)
            .subscribe((networkTools: INetworkToolsModel) => {
                this.traceNetworkTools = <INetworkToolsModel>(networkTools);
                this.traceInProgress = false;
            });
    }

    startSpeedTest() {
        this.speedTestInProgress = true;
        this._speedTestService.startSpeedTest();
    }

    stopSpeedTest() {
        this.speedTestInProgress = false;
        this._speedTestService.stop();
    }

    canDeactivate(): any {
        // Ask User
        if (!this.pingInProgress && !this.traceInProgress && !this.speedTestInProgress) {
            return true;
        }
        let warning;
        if (this.pingInProgress) {
            warning = Resources.pingInProgressWarning;
        }
        if (this.traceInProgress) {
            warning = Resources.traceInProgressWarning;
        }
        if (this.speedTestInProgress) {
            warning = Resources.speedTestInProgressWarning;
        }
        let p = Promise.resolve(this._modalService.activate(warning, Resources.warning));
        return Observable.fromPromise(p);
    }

    ngOnInit() {
        exLog('hello Network Tools component');
        this.clearResults();

        this.speedTestSub = this._store.select('speedTest')
            .subscribe((speedTestData: any) => {
                this.speedTestData = speedTestData;
            });

    }

    clearResults(): void {
        this.ipNetworkTools.result = emptyResult;
        this.traceNetworkTools.result = emptyResult;
    }

    ngOnDestroy() {
        if (this.speedTestInProgress) {
            this._speedTestService.stop();
        }
        this.speedTestSub.unsubscribe();
    }

}