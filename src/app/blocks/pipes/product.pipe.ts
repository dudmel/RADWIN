import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'productPipe'
})

export class ProductPipe implements PipeTransform {
    transform(value: string): any {

        if (value == undefined) return '';
        let res = value.split('- RW-5');
        return res[0];
    }
}
