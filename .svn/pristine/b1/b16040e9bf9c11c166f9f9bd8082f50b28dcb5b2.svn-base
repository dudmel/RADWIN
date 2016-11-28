import { Component, OnInit, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { exLog } from './shared/global-methods';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    styles: [require('../assets/scss/style.scss')],
    encapsulation: ViewEncapsulation.None,
    template: `<router-outlet></router-outlet>`
})
export class App {
  constructor(public toastr: ToastsManager,
              private vRef: ViewContainerRef) {
                  this.toastr.setRootViewContainerRef(vRef);
              }

    ngOnInit() {
        exLog('Hello App Component !');
        document.title = 'RADWIN ' + window.location.hostname;
    }
}
