import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppStore, ExHttpService } from '../../blocks';
import { IChangeBandModel } from './change-band.model';
import { Consts, exLog } from '../../shared';

let changeBandUrl = Consts.baseUrls.changeBand;

@Injectable()
export class ChangeBandService {
  constructor(private _httpService: ExHttpService<IChangeBandModel>,
              private _store: Store<AppStore>) {
                //this.getData();
              }

  getData(): any {
    this._httpService.getData(changeBandUrl)
          .map(payload => ({ type: 'GET_BANDS', payload }))
          .subscribe(action =>  {
              this._store.dispatch(action);
            });
  }

  setData(band: IChangeBandModel): any {
    return this._httpService.postData(band, changeBandUrl);
  }
}
