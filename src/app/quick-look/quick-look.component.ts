import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { WModalService, AppStore } from '../blocks';
import { IMonitorModel } from '../monitor';
import { ISystemModel } from '../system';
import { Resources, exLog, Consts } from '../shared';
import { RssMonitorComponent} from '../rss-monitor'

 
@Component({
    selector: 'quick-look',
    template: require('./quick-look.component.html'),
    styles: [require('./quick-look.styles.scss')],
    outputs: ['rssMonitorClicked']
})

export class QuickLookComponent implements OnInit, OnDestroy {
    private monitor: IMonitorModel;
    private system: ISystemModel;
    private alarmsCounter: number;
    private mbpsUnits: boolean = true;
    private isTimeOutPopupOpen: boolean = false;
    private monitorSub;
    private systemSub;
    private alarmsCounterSub;
    private timeoutOccuredSub;
    private tokenExpirationSub;
    private rssMonitorClicked = new EventEmitter;
    
    constructor(private _modalService: WModalService,
        private _router: Router,
        private _store: Store<AppStore>) { }

    ngOnInit() {
        exLog('hello Quick Look component');

        this.monitorSub = this._store.select('monitor')
            .subscribe((monitor: IMonitorModel) => {
                this.monitor = monitor;
            });

        this.systemSub = this._store.select('system')
            .subscribe((system: ISystemModel) => {
                this.system = system;
            });

        this.alarmsCounterSub = this._store.select('alarmsCounter')
            .subscribe((counter: number) => {
                this.alarmsCounter = counter;
            });

        this.timeoutOccuredSub = this._store.select('timeoutOccured')
            .subscribe((timeoutOccured: boolean) => {
                if (timeoutOccured && !this.isTimeOutPopupOpen) {
                    console.log('timeout');
                    this._modalService.activate(Resources.timeout, Resources.error,
                                                undefined, '', Consts.ModalType.error)
                        .then(response => {
                            this.isTimeOutPopupOpen = true;
                            this._router.navigate(['login']);
                        });
                }
            });

        this.tokenExpirationSub = this._store.select('tokenExpiration')
            .subscribe((tokenExpiration: boolean) => {
                if (tokenExpiration) {
                    this._modalService.activate(Resources.tokenExpiration, Resources.error, undefined, '')
                        .then(response => {
                            this._router.navigate(['login']);
                        });
                }
            });
    }

    ngOnDestroy() {
        this.systemSub.unsubscribe();
        this.monitorSub.unsubscribe();
        this.alarmsCounterSub.unsubscribe();
        this.timeoutOccuredSub.unsubscribe();
        this.tokenExpirationSub.unsubscribe();
    }

    onLanClick() {
        this.mbpsUnits = !this.mbpsUnits;
    }

    getRssImg() {
        if (!this.monitor.hsuLinkState || this.monitor.hsuLinkState == 'Not Synchronized') return '../../assets/icon/rss4.svg'; 
        if (this.monitor.hsuRss >= -65) return '../../assets/icon/rss1.svg' 
        if (this.monitor.hsuRss >= -80 && this.monitor.hsuRss < 65 ) return '../../assets/icon/rss2.svg' 
        if (this.monitor.hsuRss < -80) return '../../assets/icon/rss3.svg' 
    }
    openRssMonitor() {
        this.rssMonitorClicked.emit();

    }
}
