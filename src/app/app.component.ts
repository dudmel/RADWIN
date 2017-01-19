import { Component, OnInit, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { exLog } from './shared/global-methods';
import { Http, Response } from '@angular/http';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    styles: [require('../assets/scss/style.scss'),require('../assets/scss/_vars.scss')],
    encapsulation: ViewEncapsulation.None,
    template: `<router-outlet></router-outlet>`
})
export class App {

    private companyName;

  constructor(public toastr: ToastsManager,
              private _http: Http,
              private vRef: ViewContainerRef) {
                  
        this.toastr.setRootViewContainerRef(vRef);
    }

    ngOnInit() {
        // exLog('Hello App Component !');

        this._http.get('./assets/files/release.json')
            .map((res: Response) => res.json()).subscribe(data => {
                this.companyName = data.vendor;
                document.title = this.companyName + ' ' + window.location.hostname
                }
            );

            document.title = window.location.hostname
    }
}
