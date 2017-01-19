import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { IRadioModel } from './radio.model';
import { IMonitorModel } from '../monitor';
import { UnitsPipe, AppStore } from '../blocks';
import { exLog } from '../shared/global-methods';
import { Consts } from '../shared/consts'

@Component({
  selector: 'radio-monitor',
  template: require('./radio-monitor.component.html'),
  styles: [require('./radio.styles.scss')],
  inputs: ['showTitle']
})

export class RadioMonitorComponent implements OnInit, OnDestroy {

  private radioSub;
  private monitorSub;
  private mobileDataSub;

  private radio: IRadioModel = <IRadioModel>{};
  private monitor: IMonitorModel = <IMonitorModel>{};
  private hideSection = true;
  private isMobile: boolean;
  
  constructor(private _store: Store<AppStore>) { }


  ngOnInit() {
    this.monitorSub = this._store.select('monitor')
      .subscribe((monitor: IMonitorModel) => {
        this.monitor = monitor;
      });

    this.radioSub = this._store.select('radio')
      .subscribe((radio: IRadioModel) => {
        this.radio = radio;
      });

    this.mobileDataSub = this._store.select('mobileData')
          .subscribe((isMobile: boolean) => {
              this.isMobile = isMobile;
          });
  }

  ngOnDestroy() {
    this.radioSub.unsubscribe();
    this.monitorSub.unsubscribe();
    this.mobileDataSub.unsubscribe();
  }
}
