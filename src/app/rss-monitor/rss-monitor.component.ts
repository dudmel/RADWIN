import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { AppStore } from '../blocks';
import { IMonitorModel } from '../monitor';
import { Resources, exLog, Consts } from '../shared';
import { RssChart } from './rss-chart.options'
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'rss-monitor',
    templateUrl: './rss-monitor.component.html',
    styleUrls: ['./rss-monitor.styles.scss'],
    outputs: ['rssMonitorClicked']
})

export class RssMonitorComponent implements OnInit, OnDestroy {
    private currRssValue: number;
    private maxRssValue: number = -90;
    private monitorSub: any;
    private pointRadius = 2;
    private rssValues = [
                {data: [], label: 'RSS', radius: this.pointRadius},
                {data: [], label: 'Best RSS', radius: this.pointRadius}
            ];
    private sparksColor: string;
    private _rssInterval: number = 1;
    private testTime: number = 10;
    private rssMonitorClicked = new EventEmitter;
    private lineChartOptions = RssChart.lineChartOptions;
    private lineChartColors = RssChart.lineChartColors;
    private lineChartLegend = RssChart.legend;
    private lineChartType = RssChart.type;
    private lineChartLabels: any[] = [];
    private currLabel = 0;
    private isRunning = true;
    // @ViewChild(BaseChartDirective) _chart;

    constructor(private _store: Store<AppStore>) { }

    ngOnInit() {
        this.startMonitor();
    }

    startMonitor() {
        this.setLabels();
        this.monitorSub = this._store.select('monitor')
            .subscribe((monitor: IMonitorModel) => {
                this.currRssValue = +monitor.hsuRss;
                if (this.currRssValue && this.isRunning) this.updateChart();
            });
    }
    
    updateChart() {
        if (this.currRssValue > this.maxRssValue) {
            this.maxRssValue = this.currRssValue;
        } 
        this.rssValues[0].data.push(this.currRssValue);
        this.rssValues[1].data = this.rssValues[1].data.map(value=>this.maxRssValue);
        this.rssValues[1].data.push(this.maxRssValue);
        this.rssValues = [this.rssValues[0],this.rssValues[1]];
        this.updateLabels();

    }
    setLabels() {
        for (let i = 0; i < this.testTime; i++) {
            if (i % 5 === 0) this.lineChartLabels.push(i);
            else this.lineChartLabels.push('');
        }
    }
    updateLabels() {
        if (this.currLabel >= this.testTime) {
            if (this.currLabel % 5 === 0) this.lineChartLabels.push(this.currLabel);
            else this.lineChartLabels.push('');
            this.rssValues[0].data.shift();
            this.rssValues[1].data.shift();
            this.lineChartLabels.shift();
        }
        this.lineChartLabels = this.lineChartLabels.slice();
        this.currLabel++;
    }

    ngOnDestroy() {
        this.monitorSub.unsubscribe()
    }
    setTestTime(value) {
        this.testTime = value;
        this.lineChartLabels = [];
        this.rssValues[0].data=[];
        this.rssValues[1].data=[];
        this.currLabel = 0;
        value === 60? this.pointRadius = 2 : this.pointRadius = 3;
        this.monitorSub.unsubscribe();
        this.startMonitor();
    }
    resetMaxtRss() {
        this.maxRssValue = -90;
        this.rssValues[1].data = this.rssValues[1].data.map(value=>this.maxRssValue);
        this.rssValues[1].data.push(this.maxRssValue);
        
        this.rssValues = [this.rssValues[0],this.rssValues[1]];
    }
   
    closeRssMonitor() {
        this.rssMonitorClicked.emit();
    }
    
}