import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Consts } from '../../shared/consts';
import { Observable } from 'rxjs/Observable';
import { exLog } from '../../shared/global-methods';
import { IActiveAlarm } from './alarms.model';
import { Store } from '@ngrx/store';
import { AppStore } from '../../blocks/store';
import { ExHttpService } from '../../blocks/exhttp.service';

let activeAlarmsUrl = Consts.baseUrls.activeAlarms;

@Injectable()
export class ActiveAlarmsService {

  constructor(private _httpService: ExHttpService<IActiveAlarm>,
              private _store: Store<AppStore>) {}

  getActiveAlarms() {
        this._httpService.getData(activeAlarmsUrl)
          .map(payload => ({ type: 'GET_ALARMS', payload }))
          .subscribe(action =>  {
              this._store.dispatch(action);
            });
  }

}
