import { Injectable, Inject } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Consts, exLog } from '../../shared';
import { AppStore, ExHttpService } from '../../blocks';
import { Store } from '@ngrx/store';

let startSpectrumUrl = Consts.baseUrls.spectrumStart;
let stopSpectrumUrl = Consts.baseUrls.spectrumStop;
let spectrumRangeUrl = Consts.baseUrls.spectrumRange;
let spectrumTableUrl = Consts.baseUrls.spectrumTable;

export interface ISpectrumData {
  spectrumChannelFrequncy: number[];
  currentAntennaA: number[];
  currentAntennaB: number[];
  averageAntennaA: number[];
  averageAntennaB: number[];
  maxAntennaA: number[];
  maxAntennaB: number[];
}

export interface ISpectrumRange {
  minChipFrequency: number;
  maxChipFrequency: number;
  maxAirFrequency: number;
  minAirFrequency: number;
  duration: number;
}

@Injectable()
export class SpectrumService {

  private spectrumSubscription: any;
  private spectrumDurationTimer: any;

  constructor(private _httpService: ExHttpService<ISpectrumData>,
              private _store: Store<AppStore>) {}


  startSpectrum(range: ISpectrumRange): any {
      let urlWithParamss = `${startSpectrumUrl}?min=${range.minAirFrequency}&max=${range.maxAirFrequency}&duration=${range.duration}`;
      this._httpService.post(urlWithParamss)
           .subscribe(response =>  {
              this.getSpectrumTable();
            });
  }

  getSpectrumTable() {
    this.spectrumSubscription = Observable.timer(0, 7000)
              .flatMap(() => this._httpService.getData(spectrumTableUrl))
              .do(a=>console.log('before map: ',a))
              .map(payload => ({ type: 'GET_SPECTRUM_TABLE', payload }))
              .subscribe(action =>  {
                  this._store.dispatch(action);
                  console.log(action);
                  
              });
  }

  getLastSpectrumTable() {
    this._httpService.getData(spectrumTableUrl)
              .map(payload => ({ type: 'GET_SPECTRUM_TABLE', payload }))
              .subscribe(action =>  {
                  this._store.dispatch(action);
              });
  }
  stopSpectrum() {
     this.spectrumSubscription.unsubscribe();
     this._httpService.post(stopSpectrumUrl).subscribe();
  }

  getRange() {
    this._httpService.getData(spectrumRangeUrl)
        .map(payload => ({ type: 'GET_SPECTRUM_RANGE', payload }))
        .subscribe(action =>  {
             this._store.dispatch(action);
         });
  }
}
