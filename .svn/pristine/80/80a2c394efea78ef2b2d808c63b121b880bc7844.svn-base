import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import { IRadioModel } from './radio.model';
import { IMonitorModel } from '../monitor';
import { UnitsPipe, AppStore } from '../blocks';
import { exLog } from '../shared/global-methods';

@Component({
  selector: 'radio-monitor',
  template: require('./radio-monitor.component.html'),
  styles: [require('./radio.styles.scss')]
})

export class RadioMonitorComponent implements OnInit, OnDestroy {

  private radio: IRadioModel = <IRadioModel>{};
  private monitor: IMonitorModel = <IMonitorModel>{};
  private radioSub;
  private monitorSub;

  constructor(private _store: Store<AppStore>) { }


  ngOnInit() {

    exLog('hello Radio monitor component');
    this.monitorSub = this._store.select('monitor')
      .subscribe((monitor: IMonitorModel) => {
        this.monitor = monitor;
      });

    this.radioSub = this._store.select('radio')
      .subscribe((radio: IRadioModel) => {
        this.radio = radio;
      });
  }

  ngOnDestroy() {
    this.radioSub.unsubscribe();
    this.monitorSub.unsubscribe();
  }

}
