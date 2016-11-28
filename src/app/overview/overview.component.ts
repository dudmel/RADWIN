import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { IMonitorModel } from '../monitor';
import { AppStore } from '../blocks';
import { SystemService } from '../system';
import { NetworkService } from '../network';
import { RadioService } from '../radio';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var jQuery: any;

@Component({
    selector: 'overview',
    template: require('./overview.component.html'),
    styleUrls: ['overview.component.scss']
})

export class OverviewComponent implements OnInit, OnDestroy {

    private monitor: any;
    private monitorSub;

    constructor(private _systemService: SystemService,
        private _networkService: NetworkService,
        private _radioService: RadioService,
        public toastr: ToastsManager,
        private _store: Store<AppStore>) { }

    ngOnInit() {
        // this.toastr.success('You are awesome!', 'Success!');
        this.monitorSub = this._store.select('monitor')
            .subscribe((monitor: any) => {
                this.monitor = monitor;
            });

        this._systemService.getData();
        this._networkService.getData();
        this._radioService.getData();

        // jQuery('.events-table-wrapper').slimScroll();
    }

    ngOnDestroy() {
        this.monitorSub.unsubscribe();
    }
}
