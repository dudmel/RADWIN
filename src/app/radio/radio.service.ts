import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore, ExHttpService } from '../blocks';
import { IRadioModel } from './radio.model';
import { Consts, exLog } from '../shared';

let radioUrl = Consts.baseUrls.radio;

@Injectable()
export class RadioService {
  constructor(private _httpService: ExHttpService<IRadioModel>,
              private _store: Store<AppStore>) {
                // this.getData();
              }

  getData() {
    this._httpService.getData(radioUrl)
          .map(payload => ({ type: 'GET_RADIO', payload }))
          .subscribe(action =>  {
              this._store.dispatch(action);
            });
  }

  setData(radio: IRadioModel) {
    this._httpService.postData(radio, radioUrl)
        .subscribe(action => {
          // this._store.dispatch({ type: 'SET_RADIO', payload: radio });
          this.getData();
        });
  }
}
