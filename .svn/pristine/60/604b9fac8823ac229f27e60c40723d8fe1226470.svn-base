import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ExHttpService } from '../blocks';
import { ISecurityModel } from './security.model';
import { Consts } from '../shared/consts';
import { exLog } from '../shared/global-methods';

let changeLinkPasswordUrl = Consts.baseUrls.changeLinkPassword;

@Injectable()
export class SecurityService {
  constructor(private _httpService: ExHttpService<ISecurityModel>) {}

  // getData(): Observable<ISecurityModel> {
  //   return this._httpService.getData(changeLinkPasswordUrl);
  // }

  setData(security: ISecurityModel): Observable<ISecurityModel> {
    return this._httpService.postData(security, changeLinkPasswordUrl);
  }
}