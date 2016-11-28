import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { Consts } from '../shared/consts';
import { AppStore, ExHttpService } from '../blocks';
import { IRecentEvents } from './recent-events.model';
import { exLog } from '../shared/global-methods';

let recentEventsUrl = Consts.baseUrls.recentEvents;

@Injectable()
export class RecentEventsService {

  constructor(private _httpService: ExHttpService<IRecentEvents>, 
              private _store: Store<AppStore>) {}

  getData(): any {
    this._httpService.getData(recentEventsUrl)
          .map(payload => ({ type: 'GET_EVENTS', payload }))
          .subscribe(action =>  {
              this._store.dispatch(action);
            });
  }
}

