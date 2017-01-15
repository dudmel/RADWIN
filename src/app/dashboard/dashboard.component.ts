import { Component, OnInit, OnDestroy, OnChanges  } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { WModalService, SpinnerService } from '../blocks';
import { QuickLookComponent } from '../quick-look';
import { exLog } from '../shared/global-methods';
import { AppStore, ProductPipe } from '../blocks';
import { Consts } from '../shared/consts';
import { ISystemModel, SystemService } from '../system';
import { IMonitorModel } from '../monitor';
import { RadioService } from '../radio/';
import { ChangeBandService } from '../radio/change-band';
import { NetworkService, TrapsDestinationsService } from '../network/';
import { MonitorService } from '../monitor/monitor.service';
import { AlarmsComponent, ActiveAlarmsService } from '../blocks/alarms';

declare var $: any;
/*
 * App Component
 * Top Level Component
 */

@Component({
    selector: 'dashboard',
    providers: [WModalService, SystemService, RadioService, ChangeBandService, SpinnerService,
                NetworkService, MonitorService, TrapsDestinationsService, ActiveAlarmsService],
    template: require('./dashboard.component.html'),
    styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit, OnDestroy {
    private system: ISystemModel;
    private alarmsCounter: number = 0;
    private activeAlarmsElement: AlarmsComponent;
    private monitorSub;
    private systemSub;
    private opendSection = 0;
    private isActive = false;
    private showRssMonitor = false;

    constructor(private _store: Store<AppStore>,
                private _monitorService: MonitorService,
                private _networkService: NetworkService,
                private _systemService: SystemService,
                private _alarmsService: ActiveAlarmsService,
                private _radioService: RadioService) { }

    ngOnInit() {
        // $.AdminLTE.layout.fix();
        exLog('Hello Dashboard Component !');
        
        this.systemSub = this._store.select('system')
            .subscribe((system: ISystemModel) => {
                this.system = system;
            });

        this.monitorSub = this._store.select('monitor')
            .subscribe((monitor: IMonitorModel) => {
                this.alarmsCounter = monitor.activeAlarmsCounter;
            });

        // System data required, when refresh fetch data
        this._systemService.getData();
    }
    ngOnChanges() {
        console.log(this.system);
    }
    ngOnDestroy() {
        this.monitorSub.unsubscribe();
        this.systemSub.unsubscribe();
    }

    logout() {
        exLog('logout');
        localStorage.removeItem(Consts.jwtToken);
    }
   
    RequestForAlarms() {
        this._alarmsService.getActiveAlarms();
    }

    getImg(state, section) {
        if (state === 'hover') return '_hover'
        else if (state === 'active') return '_active'
        else return '';
    }
}
