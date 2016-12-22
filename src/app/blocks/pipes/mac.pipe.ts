import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mac'
})

export class MacPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) return '';
        return displayMacAddress(value);
    }
}

function displayMacAddress(rawAddress: string) {
    var formattedAddress = '';
    for (var i=0; i < rawAddress.length; i+=2) {
        formattedAddress += rawAddress.slice(i,i+2) + ':';
    }
    return formattedAddress.slice(0,-1);
}
