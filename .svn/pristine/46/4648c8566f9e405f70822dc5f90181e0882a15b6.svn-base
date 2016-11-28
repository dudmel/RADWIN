import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'units'
})

export class UnitsPipe implements PipeTransform {
    transform(value: string, unit: string): any {

        if (value === undefined) return '';

        switch (unit) {
            case 'dbm':
                return value + ' [dBm]';
            case 'mhz':
                return value + ' [MHz]';
            case 'ghz':
                if (value && value.indexOf('[GHz]') >= 0) { return value; }
                return value + ' [GHz]';
            case 'mbs':
                return value + ' [Mb/s]';
            case 'fps':
                return value + ' [Fps]';
            case 'c':
                return value + ' [c]';
            case 'w':
                return value + ' [w]';
            default:
                break;
        }
        return value;
    }
}
