import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { ExHttpService } from '../blocks';
import { Consts } from '../shared/consts';
import { IMonitorModel } from './monitor.model';
import { AppStore } from '../blocks';
import { Store } from '@ngrx/store';

const monitorUrl = Consts.baseUrls.monitor;
const monitorInterval = Consts.monitorInterval;

@Injectable()
export class MonitorService {

  private _timeoutsCounter: number = 0;
  private isMonitorSuspend: boolean;
  private monitorSub: Subscription;
  private stateProviderSub: Subscription;

  constructor(private _httpService: ExHttpService<IMonitorModel>,
    private _store: Store<AppStore>) {

      this.subscribeToMonitorSuspend();
 }

  startMonitoring() {
    this.monitorSub = Observable.timer(0, monitorInterval)
      .flatMap(() => this.sendMonitorRequest())
      .map(payload => ({ type: 'GET_MONITOR', payload }))
      .subscribe(action => {
            this._store.dispatch(action);
            this._timeoutsCounter--;
          }, (err: any) => {
            // Handle token expiration
            if (err.status === 401) {
              this.onTokenExpiration();
              return;
            }

            this.startMonitoring();
      });
  }

  sendMonitorRequest(): any {

    if (this._timeoutsCounter >= Consts.timeoutRetries) {
      this.onTimeOut();
      return;
    }

    this._timeoutsCounter++;
    return Observable.from(this._httpService.getData(monitorUrl));
  }

  stopMonitor() {
    if (this.monitorSub != undefined)
      this.monitorSub.unsubscribe();
  }

  subscribeToMonitorSuspend() {
    this.stateProviderSub = this._store.select('monitorSuspend')
        .subscribe((isSuspend: boolean) => {
            this.isMonitorSuspend = isSuspend;

            this._timeoutsCounter = 0;
            
            if (this.isMonitorSuspend)
              this.stopMonitor();
            else
              this.startMonitoring();
        });
  }

  onTimeOut() {
    this._timeoutsCounter = 0;
    this.stopMonitor();
    this._store.dispatch({ type: 'TIMEOUT_OCCURED' });
  }

  onTokenExpiration() {
    this._store.dispatch({ type: 'TOKEN_EXPIRATION' });
  }

  terminate() {
    
  }
}
