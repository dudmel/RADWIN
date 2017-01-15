import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'productPipe'
})

export class ProductPipe implements PipeTransform {
    transform(value: string): any {

        if (value == null || value == undefined)
            return '';

        try {
                let res = value.split('- RW-5');
                return res[0];
            } catch (error) {
                return ''
            }
    }
}
