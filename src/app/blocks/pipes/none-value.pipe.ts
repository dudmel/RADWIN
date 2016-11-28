import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'noneValuePipe'
})

export class NoneValuePipe implements PipeTransform {
    transform(value: string): any {
        if (!value) {
            return 'N/A';
        } else {
            return value;           
        }
    }
}
