import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActiveAlarmsService } from './alarms.service';
import { IActiveAlarm } from './alarms.model';
import { Store } from '@ngrx/store';
import { AppStore, ExHttpService } from '../../blocks';

@Component({
    selector: 'active-alarms',
    providers: [ActiveAlarmsService],
    template: `
                <li class="alarms-dropdown-header">Active Alarms
                </li>
                <li>
                    <!-- inner menu: contains the actual data -->
                    <ul class="menu" style="padding: 15px;">
                        <div *ngIf="alarms && alarms.length == 0">No Active Alarms</div>
                        <div class="alarms-list">
                            <li *ngFor="let alarm of alarms">
                                <h4>{{ alarm.interfaceName }}</h4>
                                <p>{{ alarm.alarmId }}</p>
                                <p>{{ alarm.alarmText }}</p>
                                <small>{{ alarm.dateAndTime }}</small>
                            </li>
                        </div>
                    </ul>
                </li>
                <!--<li class="footer"><a href="#">See All Messages</a></li>-->    
    `,
    encapsulation: ViewEncapsulation.None
})

export class AlarmsComponent implements OnInit, OnDestroy {

    private alarms: IActiveAlarm[];
    private activeAlaramsSub;

    constructor(private _alarmsService: ActiveAlarmsService,
        private _store: Store<AppStore>) {
    }

    ngOnInit() {
        this.activeAlaramsSub = this._store.select('activeAlarms')
            .subscribe((alarms: IActiveAlarm[]) => {
                this.alarms = alarms;
            });
    }

    ngOnDestroy() {
        this.activeAlaramsSub.unsubscribe();
    }
}
