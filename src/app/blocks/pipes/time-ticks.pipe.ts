import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeTicks'
})

export class TimeTicks implements PipeTransform {
    transform(value: number): any {

        if (!value) return '';

        // let _date = new Date();
        // _date.setSeconds(-value / 10);
        // return _date
        return displayTime(value / 100);
    }
}

function displayTime(ticksInSecs: number) {
    let ticks = Math.round(ticksInSecs);
    let dd = Math.floor(ticks / 86400);
    let hh = Math.floor(ticks / 3600) % 24;
    let mm = Math.floor(ticks / 60) % 60;
    let ss = ticks % 60;

    return pad(dd,2) + 'd:' + pad(hh, 2) + 'h:' + pad(mm, 2) + 'm:' + pad(ss, 2) + 's';
}

function pad(n, width) {
    let _n = n + '';
    return _n.length >= width ? _n : new Array(width - _n.length + 1).join('0') + _n;
}