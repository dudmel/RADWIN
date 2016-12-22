import {
    Component, Input, OnInit, Attribute, ChangeDetectionStrategy,
    ViewEncapsulation, AfterViewInit
} from '@angular/core';
import { Consts } from '../shared/consts';

declare var RadialGauge: any;

/*
 * App Component
 * Top Level Component
 */

@Component({
    selector: 'gauge',
    template: `
                <div class="gauge-container">
                    <canvas id="{{_title}}"></canvas>
                </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class GaugeComponent implements OnInit {

    private _title: string;
    private _gauge: any;
    private _value: number;

    @Input()
    set value(val: number) {
        if (val >= 0 && this._gauge) {
            this._value = val;
            this._gauge.value = this._value;
        }
    };

    get value() {
        return this._value;
    }

    constructor( @Attribute('title') _title) {
        this._title = _title;
        this._value = 0;
    }

    ngAfterViewInit() {
        this._gauge = new RadialGauge({
            renderTo: this._title,
            title: this._title,
            width: 250,
            height: 250,
            units: 'Mb/s',
            minValue: 0,
            maxValue: 120,
            majorTicks: [
                '0',
                '30M',
                '60M',
                '90M',
                '120M',
            ],
            minorTicks: 0,
            strokeTicks: true,
            highlights: [
                {
                    'from': 0,
                    'to': 30,
                    'color': 'rgba(141, 181, 211, 1)'
                },
                {
                    'from': 30,
                    'to': 60,
                    'color': 'rgba(251, 204, 196, 1)'
                },
                {
                    'from': 60,
                    'to': 90,
                    'color': 'rgba(114, 205, 154, 1)'
                }
            ],
            colorPlate: '#fff',
            borderShadowWidth: 0,
            colorBorderOuter: '#f3abab',
            colorBorderInner: '#f3abab',
            borders: false,
            needleType: 'line',
            needleWidth: 3,
            needleStart: 1,
            needleCircleSize: 0.1,
            needleCircleOuter: true,
            needleCircleInner: false,
            animationDuration: 1500,
            animationRule: 'linear',
            valueBox: true,
            valueBoxStroke: 0,
            colorValueBoxBackground: '#fff',
            colorValueBoxRect: '#fff',
            colorValueBoxShadow: '#fff',
            valueBoxBorderRadius: 0,
            valueInt: 1,
            valueDec: 1,
            fontValue: 'Roboto',
            fontNumbers: 'Roboto',
            fontUnits: 'Roboto',
            fontTitle: 'Roboto',
            colorNeedle: '#f47f6b',
        }).draw();
    }

    ngOnInit() {

    }

}
