import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ExHttpService } from '../../blocks';
import { INetworkToolsModel } from './network-tools.model';
import { Consts } from '../../shared/consts';

let ping = Consts.baseUrls.ping;
let trace = Consts.baseUrls.trace;

@Injectable()
export class NetworkToolsService {
  constructor(private httpService: ExHttpService<INetworkToolsModel>) { }

  ping(networkTools: INetworkToolsModel): any {
    return this.httpService.postData(networkTools, ping);
  }

  trace(networkTools: INetworkToolsModel): any {
     return this.httpService.postData(networkTools, trace);
  }
}
