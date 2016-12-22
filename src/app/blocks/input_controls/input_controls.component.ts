import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'input-controls',
  template: `
    <section>
        <span class="control control-plus"  (click)="btnClicked(+1)"> </span>
        <span class="control control-minus" (click)="btnClicked(-1)"> </span>
    </section>
  `,
  styleUrls: ['./input_controls.scss'],
  inputs: ['inputToChange', 'step'],
})

export class InputControls {
    private inputToChange;
    private step;
    private bgColor;

    ngOnInit() {
        this.inputToChange.step? this.step = +this.inputToChange.step: this.step = 1;
    }

    btnClicked(sign) {
        if ( this.inputToChange.value == this.inputToChange.max && sign == +1 ||
             this.inputToChange.value == this.inputToChange.min && sign == -1 ||
             this.inputToChange.getAttribute('readonly') !== null
            ) return;
        this.inputToChange.value = +this.inputToChange.value + sign * this.step
    }
}
