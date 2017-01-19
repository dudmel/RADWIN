import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { ISystemModel } from './system.model';
import { INetworkModel } from '../network';
import { AppStore } from '../blocks';
import { exLog } from '../shared/global-methods';
import { Store } from '@ngrx/store';
import { IMonitorModel } from '../monitor';
import { Consts } from '../shared/consts'

@Component({
    selector: 'system-monitor',
    styleUrls: ['./system.styles.scss'],
    template: require('./system-monitor.component.html'),
})

export class SystemMonitorComponent implements OnInit, OnDestroy {

    private systemSub: Subscription;
    private networkSub: Subscription;
    private monitorSub: Subscription;
    private mobileDataSub: Subscription;
    
    private system: ISystemModel = <ISystemModel>{};
    private network: INetworkModel = <INetworkModel>{};
    private isLinkSynchronized: boolean
    private hideSection:boolean;
    private isMobile: boolean;

    constructor(private _store: Store<AppStore>) {
        this.hideSection = true;
     }

    ngOnInit() {
        // exLog('hello System Monitor component');
        this.systemSub = this._store.select('system')
            .subscribe((system: ISystemModel) => {
                this.system = system;

                this.updateSystemParameters(system.installConfirmReq);
            });

        this.networkSub = this._store.select('network')
            .subscribe((network: INetworkModel) => {
                this.network = network;
            });

        this.monitorSub = this._store.select('monitor')
            .subscribe((monitor: IMonitorModel) => {
                this.isLinkSynchronized = monitor.hsuLinkState !== 'Not Synchronized';
            });

        this.mobileDataSub = this._store.select('mobileData')
            .subscribe((isMobile: boolean) => {
                this.isMobile = isMobile;
            });
    }

    ngOnDestroy() {
        this.systemSub.unsubscribe();
        this.networkSub.unsubscribe();
        this.monitorSub.unsubscribe();
        this.mobileDataSub.unsubscribe();
    }

    updateSystemParameters(installConfirmReq: boolean) {
        this._store.dispatch({ type: 'RADIUS_DATA', payload: installConfirmReq });
    }
}
