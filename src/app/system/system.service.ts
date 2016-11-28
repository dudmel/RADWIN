import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ISystemModel } from './system.model';
import { Consts, exLog } from '../shared';
import { AppStore, ExHttpService } from '../blocks';

let systemUrl = Consts.baseUrls.system;

@Injectable()
export class SystemService {
  constructor(private _httpService: ExHttpService<ISystemModel>,
              private _store: Store<AppStore>) {
                // this.getData();
              }

  getData() {
    this._httpService.getData(systemUrl)
          .map(payload => ({ type: 'GET_SYSTEM', payload }))
          .subscribe(action =>  {
              this._store.dispatch(action);
            });
  }

  setData(system: ISystemModel) {
    this._httpService.postData(system, systemUrl)
        .subscribe(action => {
          // this._store.dispatch({ type: 'SET_SYSTEM', payload: system });
          this.getData();
        });
  }

}
