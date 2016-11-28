import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppStore, ExHttpService } from '../blocks';
import { ITrapDestination } from './network.model';
import { Consts } from '../shared/consts';

let trapsUrl = Consts.baseUrls.trapsDestinations;

@Injectable()
export class TrapsDestinationsService {
  constructor(private _httpService: ExHttpService<ITrapDestination[]>,
    private _store: Store<AppStore>) {
    // this.getData();
  }

  getData(): any {
    this._httpService.getData(trapsUrl)
      .map(payload => ({ type: 'GET_TRAPS', payload }))
      .subscribe(action => {
        this._store.dispatch(action);
      });
  }

  setData(traps: ITrapDestination[]) {
    this._httpService.postData(traps, trapsUrl)
      .subscribe(action => {
        // this._store.dispatch({ type: 'GET_NETWORK', payload: network });
        this.getData();
      });
  }
}
