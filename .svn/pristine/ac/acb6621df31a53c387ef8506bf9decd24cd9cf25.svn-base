import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore, ExHttpService } from '../../blocks';
import { ISpeedTestModel } from './network-tools.model';
import { Consts, exLog } from '../../shared';

let speedtestDataUrl = Consts.baseUrls.speed + '/data';
let startSpeedtestUrl = Consts.baseUrls.speed + '/start';
let stopSpeedtestUrl = Consts.baseUrls.speed + '/stop';

@Injectable()
export class SpeedTestService {
  private speedTestIntervalSub: any;
  private speedTestIDataSub: any;

  constructor(private _httpService: ExHttpService<ISpeedTestModel>,
              private _store: Store<AppStore>) { }


  startSpeedTest() {
    // Every 28 seconds start speed test
    this._store.dispatch({ type: 'CLEAR_SPEEDTEST_DATA' });

    this.speedTestIntervalSub = Observable.timer(0, 28000)
          .flatMap(() => this._httpService.post(startSpeedtestUrl))
          .subscribe();

    this.speedTestIDataSub = Observable.interval(1000)
            .flatMap(() => this._httpService.getData(speedtestDataUrl))
            .map(payload => ({ type: 'GET_SPEEDTEST_DATA', payload }))
            .subscribe(action =>  {
              this._store.dispatch(action);
            });
  }

  stop() {
    this._httpService.post(stopSpeedtestUrl).subscribe();

    if (this.speedTestIntervalSub !== undefined)
      this.speedTestIntervalSub.unsubscribe();
    if (this.speedTestIDataSub !== undefined)
    this.speedTestIDataSub.unsubscribe();


    // this._store.dispatch({ type: 'CLEAR_SPEEDTEST_DATA' });
  }
}
