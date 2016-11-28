import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, ResponseContentType, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { reqPostOptions, Consts } from '../shared';
// import { AuthHttp } from 'angular2-jwt';


export interface ExHttpService<T> {
  getData(url: string): any;
  get(url: string): any;
  postData(bodyPayload: T, url: string): any;
  post(url: string, bodyPayload?: T): any;
  getBlob(url: string): any;
}

@Injectable()
export class ExHttpService<T> implements ExHttpService<T> {

  constructor(private _http: Http) { }

  createJwtAuthorizationHeader(): Headers {

    let header = new Headers();
    header.append('Authorization', Consts.jwtPrefix +
      localStorage.getItem(Consts.jwtToken));

    return header;
  }

  createJwtAuthorizationRequestOptions(): RequestOptions {

    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
    options.headers.append('Authorization', Consts.jwtPrefix +
      localStorage.getItem(Consts.jwtToken));

    return options;
  }

  getData(url: string): any {
    return this._http.get(url, { headers: this.createJwtAuthorizationHeader()})
      .map((response: Response) => <T>response.json().data);
  }

  get(url: string): any {
    return this._http.get(url, { headers: this.createJwtAuthorizationHeader()})
      .map((response: Response) => <T>response.json());
  }

  getBlob(url: string): any {
    return this._http.get(url, { headers: this.createJwtAuthorizationHeader(),
      responseType: ResponseContentType.Blob });
  }

  postData(bodyPayload: T, url: string): any {
    let body = JSON.stringify(bodyPayload);
    return this._http
      .post(url, body, this.createJwtAuthorizationRequestOptions())
      .map(res => res.json().data);
  }

  post(url: string, bodyPayload?: T): any {
    let body = JSON.stringify(bodyPayload);
    return this._http
      .post(url, body, this.createJwtAuthorizationRequestOptions())
      .map(res => res.json());
  }
}
