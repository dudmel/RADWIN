import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppStore, ExHttpService } from '../blocks';
import { INetworkModel } from './network.model';
import { Consts } from '../shared/consts';


let networkUrl = Consts.baseUrls.network;

@Injectable()
export class NetworkService {
  constructor(private _httpService: ExHttpService<INetworkModel>,
              private _store: Store<AppStore>) {
                // this.getData();
              }

  getData(): any {
    this._httpService.getData(networkUrl)
          .map(payload => ({ type: 'GET_NETWORK', payload }))
          .subscribe(action =>  {
              this._store.dispatch(action);
            });
  }

  setData(network: INetworkModel) {
    this._httpService.postData(network, networkUrl)
        .subscribe(action => {
          //this._store.dispatch({ type: 'GET_NETWORK', payload: network });
          this.getData();
        });
  }
}
