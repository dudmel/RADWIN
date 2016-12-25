import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ExHttpService } from '../../blocks';
import { Consts, exLog } from '../../shared';
import { IRestoreToDefaultsData }    from './restoreToDefaults/restore-to-defaults-data';

let resetUrl = Consts.baseUrls.reset;
let resyncUrl = Consts.baseUrls.resync;
let restoreToDefaultsUrl = Consts.baseUrls.restoreToDefaults;
let activateLicenseUrl = Consts.baseUrls.activateLicense;
let skipAlignmentUrl = Consts.baseUrls.skipAlignment;
let diagnosticsUrl = Consts.baseUrls.diagnostics;
let spectrumTableUrl = Consts.baseUrls.spectrumTable;

@Injectable()
export class OperationsService {
  constructor(private _httpService: ExHttpService<any>) {}

  getDiagnostics(): any {
     return this._httpService.get(diagnosticsUrl);
  }

    getSpectrum(): any {
     return this._httpService.get(spectrumTableUrl);
  }

  reset(): any {
    return this._httpService.post(resetUrl);
  }

  restoreToDefaults(data: IRestoreToDefaultsData): any {
    return this._httpService.postData(data, restoreToDefaultsUrl);
  }

  resync(): any {
    return this._httpService.post(resyncUrl);
  }

  getActivateLicense() {
    return this._httpService.get(activateLicenseUrl);
  }

  activateDevice() {
    return this._httpService.post(skipAlignmentUrl);
  }

  setActivateLicense(key: string) {
    let urlWithParamss = `${activateLicenseUrl}?key=${key}`;
    return this._httpService.post(urlWithParamss);
  }
}
