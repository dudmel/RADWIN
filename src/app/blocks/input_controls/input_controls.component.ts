import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'input-controls',
  template: `
    <section>
        <span class="control control-plus"  (click)="btnClicked(+1)"> </span>
        <span class="control control-minus  icon-down-dir" (click)="btnClicked(-1)"> </span>
    </section>
  `,
  styleUrls: ['./input_controls.scss'],
  inputs: ['form'],
})

export class InputControls {
    constructor(private _el: ElementRef){
        this.input = new ElementRef(_el.nativeElement.parentNode.children[0]).nativeElement;
}
    private step;
    private input;
    private form;
    private initValue;

    ngOnInit() {
        this.input.step? this.step = +this.input.step : this.step = 1;
    }

    btnClicked(sign) {
        if ( this.input.value == this.input.max && sign == +1 ||
             this.input.value == this.input.min && sign == -1 ||
             this.input.getAttribute('readonly') !== null
        ) return;
        
        let newValue = +this.input.value + sign * this.step;
        let controlName = this.input.getAttribute('formcontrolname');

        if (this.form.controls[controlName].pristine) this.initValue = this.form.controls[controlName].value;
        
        this.form.controls[controlName].setValue(newValue); 
        
        if (newValue === this.initValue) this.form.controls[controlName].markAsPristine();
        else this.form.controls[controlName].markAsDirty();

    }
}
