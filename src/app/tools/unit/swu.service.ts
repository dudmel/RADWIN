import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ExHttpService } from '../../blocks';
import { Consts, exLog } from '../../shared';

let swuValidateUrl = Consts.baseUrls.swuValidate;
let swuStartUrl = Consts.baseUrls.swuStart;
let swuStartBackupUrl = Consts.baseUrls.swuBackup;

export interface ISwuMetaData {
  type: string;
  release: string;
  description: string;
  message?: string;
  error?: any;
  date: string;
}

@Injectable()
export class SwuService {
  constructor(private _httpService: ExHttpService<ISwuMetaData>) {}

  getSwuState(mode): Observable<ISwuMetaData> {
    exLog('SWU getdata');
    return this._httpService.getData(swuValidateUrl + '?mode=' + mode);
  }

  startSwu(mode): Observable<ISwuMetaData> {
     exLog('SWU start');
     return this._httpService.post(swuStartUrl + '?mode=' + mode);
   }

  startBackup(): any {
     exLog('SWU BACKUP start');
     return this._httpService.getBlob(swuStartBackupUrl);
   }

}
