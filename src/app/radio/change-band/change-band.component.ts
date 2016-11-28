import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppStore, WModalService } from '../../blocks';
import { ChangeBandService } from './change-band.service';
import { IChangeBandModel } from './change-band.model';
import { IMonitorModel } from '../../monitor';
import { Resources, exLog } from '../../shared';
import 'rxjs/add/observable/fromPromise';

@Component({
    selector: 'change-band',
    providers: [ChangeBandService],
    template: require('./change-band.component.html')
})

export class ChangeBandComponent implements OnInit, OnDestroy {
    private bandform: FormGroup;
    private bands: IChangeBandModel;
    private monitor: IMonitorModel;
    private linkOff: boolean;
    private changeBandSub;
    private monitorSub;

    constructor(private _bandService: ChangeBandService,
        private _store: Store<AppStore>,
        private _modalService: WModalService,
        private _formBuilder: FormBuilder) {

        this.bandform = _formBuilder.group({
            currentBandId: ['']
        });

    }

    changeBand() {
        this._modalService.activate(Resources.changeBandWarning, Resources.warning)
            .then(responseOk => {
                if (responseOk) {
                    exLog('Change Band Form Value: ', this.bandform.value);
                    this._bandService.setData(this.bandform.value)
                        .subscribe(response => {
                            exLog(response);
                            if (response.code === '200') {
                                let p = Promise.resolve(this._modalService.activate(Resources.reseting, Resources.changeBandSuccess));
                                return Observable.fromPromise(p);
                            }
                        });
                }
            });
    }


    canDeactivate(): any {
        if (!this.bandform || !this.bandform.dirty) {
            return true;
        }
        // Ask User
        return Observable.fromPromise(Promise.resolve(this._modalService.activate()));
    }

    ngOnInit() {
        exLog('hello Change Band Configuration Component');
        this.changeBandSub = this._store.select('changeBand')
            .subscribe((bands: IChangeBandModel) => {
                this.bands = bands;
            });

        this.monitorSub = this._store.select('monitor')
            .subscribe((monitor: IMonitorModel) => {
                this.monitor = monitor;
                this.linkOff = monitor.hsuLinkState === 'Not Synchronized';
                if (!this.linkOff) {
                    this.bandform.controls['currentBandId'].disable();
                } else {
                    this.bandform.controls['currentBandId'].enable();
                }
            });
    }

    ngOnDestroy() {
        this.changeBandSub.unsubscribe();
        this.monitorSub.unsubscribe();
    }

}