import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectionStrategy, Attribute } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AppStore, WModalService } from '../blocks';
import { IMonitorModel } from './monitor.model';
import { exLog } from '../shared';
import { Store } from '@ngrx/store';
declare var jQuery: any;

let hsuColor = '#8db5d3';
let hbsColor = '#f47f6b';

@Component({
    selector: 'device-monitor',
    template: require('./device-monitor.component.html'),
    styles: [require('./device-monitor.styles.scss')],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DeviceMonitorComponent implements OnInit {

    private monitorSub: any;
    private isLinkSynchronized: Boolean;

    monitor: IMonitorModel;
    @ViewChild('tputsparkline') tputSpark: ElementRef;
    @ViewChild('rsssparkline') rssSpark: ElementRef;
    @ViewChild('txsparkline') txSpark: ElementRef;
    @ViewChild('rxsparkline') rxSpark: ElementRef;
    tputValues: number[] = [];
    rssValues: number[] = [];
    txValues: number[] = [];
    rxValues: number[] = [];
    sparksColor: string = hsuColor;
    device: string  = '';

    constructor(@Attribute('device') device, private _store: Store<AppStore>) {
        this.device = device;
    }

    ngOnInit() {
        if (this.device === 'HSU') {
            this.sparksColor = hsuColor;
        } else {
            this.sparksColor = hbsColor;
        }

        this.isLinkSynchronized = false;

    this.monitorSub = this._store.select('monitor')
      .subscribe((monitor: IMonitorModel) => {
          this.isLinkSynchronized = (monitor.hsuLinkState !== "Not Synchronized");
      });

    this.tputLineOptions.lineColor = this.sparksColor;
    this.tputLineOptions.spotColor = this.sparksColor;
    this.lanBarOptions.barColor = this.sparksColor;
    this.rssBarOptions.barColor = this.sparksColor;
    }

    // http://omnipotent.net/jquery.sparkline/#s-docs

    private _tput: number;
    @Input()
    set tput(value: number){
        if (value) {
            if (this.isLinkSynchronized){
                this._tput = value;
                this.tputValues.push(this._tput);
            } else { this.tputValues = []  }

            if (this.tputValues.length >= 20) {
                this.tputValues.shift();
            }
            jQuery(this.tputSpark.nativeElement).sparkline(this.tputValues, this.tputLineOptions);
        }
    };

    get tput(){
        return this._tput;
    }


    private _rss: number;
    @Input()
    set rss(value: number){
        if (value) {
                        
            if (this.isLinkSynchronized){
                this._rss = value < -95 ? -95 : value;
                this.rssValues.push(this._rss);
            } else { this.rssValues = []  }

            if (this.rssValues.length >= 10) {
                this.rssValues.shift();
            }
            jQuery(this.rssSpark.nativeElement).sparkline(this.rssValues, this.rssBarOptions);
        }
    };

    get rss(){
        return this._rss;
    }

    private _tx: number;
    @Input()
    set tx(value: number){
        if (value) {
            if (this.isLinkSynchronized){
                this._tx = value;
                this.txValues.push(this._tx);
            } else { this.txValues = []  }

            if (this.txValues.length >= 12) {
                this.txValues.shift();
            }
            jQuery(this.txSpark.nativeElement).sparkline(this.txValues, this.lanBarOptions);
        }
    };

    get tx(){
        return this._tx;
    }

    private _rx: number;
    @Input()
    set rx(value: number){
        if (value) {
            if (this.isLinkSynchronized){
                this._rx = value;
                this.rxValues.push(this._rx);
            } else { this.rxValues = [] }

            if (this.rxValues.length >= 12) {
                this.rxValues.shift();
            }
            
            jQuery(this.rxSpark.nativeElement).sparkline(this.rxValues, this.lanBarOptions);
        }
    };

    get rx(){
        return this._rx;
    }

    private tputLineOptions: any = {
            type: 'line',
            width: '170px',
            height: '40px',
            lineColor: this.sparksColor,
            fillColor: 'transparent',
            spotColor: this.sparksColor,
            spotRadius: '3',
            drawNormalOnTop: true,
            lineWidth: '3'
        };

    private rssBarOptions: any = {
            type: 'bar',
            width: '100px',
            height: '40px',
            barColor: this.sparksColor,
            barWidth: 15,
            chartRangeMin: 0,
            barSpacing: 5
        };

    private lanBarOptions: any = {
            raw: true,
            type: 'bar',
            width: '100px',
            height: '40px',
            barColor: this.sparksColor,
            barWidth: 7,
            chartRangeMin: 0,
            barSpacing: 5
        };


}
