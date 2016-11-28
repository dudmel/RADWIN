import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore, ExHttpService } from '../blocks';
import { IWifiModel } from './wifi.model';
import { Consts, exLog } from '../shared';

let wifiUrl = Consts.baseUrls.wifi;

@Injectable()
export class WifiService {
  constructor(private _httpService: ExHttpService<IWifiModel>,
              private _store: Store<AppStore>) {
                // this.getData();
              }

  getData() {
    this._httpService.getData(wifiUrl)
          .map(payload => ({ type: 'GET_WIFI', payload }))
          .subscribe(action =>  {
              this._store.dispatch(action);
            });
  }

  setData(wifi: IWifiModel) {
    this._httpService.postData(wifi, wifiUrl)
        .subscribe(action => {
          // this._store.dispatch({ type: 'SET_SYSTEM', payload: system });
          this.getData();
        });
  }
}
