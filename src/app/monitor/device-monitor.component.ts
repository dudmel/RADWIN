import { Component, OnInit, ViewChild, ElementRef, Input, ChangeDetectionStrategy, Attribute } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
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
    // changeDetection: ChangeDetectionStrategy.OnPush
})

export class DeviceMonitorComponent implements OnInit {

    private monitorSub: Subscription;
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
    
    private _tx: string;
    private _rss: string;
    private _rx: string;
    private _tput: string;

    get rss() {
        return this.monitor[this._rss];
    }
    get tput() {
        return +((this.monitor[this._tput] / 1000).toFixed(1));
    } 
    get tx() {
        return this.monitor[this._tx];
    }
    get rx() {
        return this.monitor[this._rx];
    }  
    
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

        this._tx = this.device.toLowerCase() + 'Lan1TxMbps';
        this._rss = this.device.toLowerCase() + 'Rss';
        this._rx = this.device.toLowerCase() + 'Lan1RxMbps';
        this._tput = this.device.toLowerCase() + 'Tput';

        this.monitorSub = this._store.select('monitor')
        .subscribe((monitor: IMonitorModel) => {
            this.monitor = monitor;    
            this.setGraph(this.tx, 'tx', this.lanBarOptions)
            this.setGraph(this.rss, 'rss', this.rssBarOptions)
            this.setGraph(this.rx, 'rx', this.lanBarOptions)
            this.setGraph(this.tput, 'tput', this.tputLineOptions)

            this.isLinkSynchronized = (monitor.hsuLinkState !== "Not Synchronized");
        });

        this.tputLineOptions.lineColor = this.sparksColor;
        this.tputLineOptions.spotColor = this.sparksColor;
        this.lanBarOptions.barColor = this.sparksColor;
        this.rssBarOptions.barColor = this.sparksColor;
    }

    // http://omnipotent.net/jquery.sparkline/#s-docs

    setGraph(value: number, graph: string, graphOptions) {
            if (this.isLinkSynchronized){
                this[graph + 'Values'].push(value);
            } else { this[graph + 'Values'] = []  }

            if (this[graph + 'Values'].length >= 12) {
                this[graph + 'Values'].shift();
            }
            jQuery(this[graph + 'Spark'].nativeElement).sparkline(this[graph + 'Values'], graphOptions);
    }

    private tputLineOptions: any = {
            type: 'line',
            width: '100%',
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
            height: '40px',
            barColor: this.sparksColor,
            barWidth: 13,
            chartRangeMin: -95,
            chartRangeMax: -35,
            barSpacing: 5,
            zeroAxis: false
        };

    private lanBarOptions: any = {
            type: 'bar',
            height: '40px',
            barColor: this.sparksColor,
            barWidth: 7,
            chartRangeMin: 0,
            barSpacing: 5,
            
        };


}
