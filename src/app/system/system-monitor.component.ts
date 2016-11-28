import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISystemModel } from './system.model';
import { INetworkModel } from '../network';
import { AppStore } from '../blocks';
import { exLog } from '../shared/global-methods';
import { Store } from '@ngrx/store';
import { IMonitorModel } from '../monitor';

@Component({
    selector: 'system-monitor',
    styleUrls: ['./system.styles.scss'],
    template: require('./system-monitor.component.html'),
})

export class SystemMonitorComponent implements OnInit, OnDestroy {

    private system: ISystemModel = <ISystemModel>{};
    private network: INetworkModel = <INetworkModel>{};
    private systemSub;
    private networkSub;
    private monitorSub;
    private  isLinkSynchronized: boolean

    constructor(private _store: Store<AppStore>) { }

    ngOnInit() {
        exLog('hello System Monitor component');
        this.systemSub = this._store.select('system')
            .subscribe((system: ISystemModel) => {
                this.system = system;
            });

        this.networkSub = this._store.select('network')
            .subscribe((network: INetworkModel) => {
                this.network = network;
            });

    this.monitorSub = this._store.select('monitor')
      .subscribe((monitor: IMonitorModel) => {
        this.isLinkSynchronized = monitor.hsuLinkState !== 'Not Synchronized';
      });
    }

    ngOnDestroy() {
        this.systemSub.unsubscribe();
        this.networkSub.unsubscribe();
    }
}