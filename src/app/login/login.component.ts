import { Component, ViewEncapsulation, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Store } from '@ngrx/store';
import { contentHeaders, Consts, Resources, exLog } from '../shared';
import { AppStore, WModalService, SpinnerService } from '../blocks';
declare var VERSION: string;

@Component({
    selector: 'login',
    providers: [WModalService, SpinnerService],
    styles: [require('./login.styles.scss')],
    template: require('./login.component.html'),
    encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {
    private form: FormGroup;
    private forgotForm: FormGroup;
    private regularLoginMode: boolean = true;
    private version: string;
    private build: string;


    constructor(private _router: Router,
        private _formBuilder: FormBuilder,
        private _http: Http,
        private _store: Store<AppStore>,
        private _modalService: WModalService,
        private _spinnerService: SpinnerService) {

        this.form = _formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.forgotForm = _formBuilder.group({
            username: ['admin'],
            password: ['', Validators.required]
        });
    }

    login(event: Event) {
        event.preventDefault();
        let body;
        if (this.regularLoginMode) {
            body = this.form.value;
        }else {
            body = this.forgotForm.value;
        }
        this._http.post(Consts.baseUrls.auth, body, { headers: contentHeaders })
            .subscribe(
            response => {
                if (response.json().access_token !== undefined) {
                    this._store.dispatch({ type: 'INIT' });
                    localStorage.setItem(Consts.jwtToken, response.json().access_token);
                    this._spinnerService.show('Loading...', true);
                    this._router.navigate(['dashboard']);
                } else {
                    this.showError();
                }
            },
            error => this.showError(error)
            );
    }

    showError(error?) {
        this._modalService.activate(Resources.wrongUserPassword,
            Resources.loginTitle, undefined, '', Consts.ModalType.error);
    }

    toggleLoginMode(event: Event) {
        exLog('forgot password !');
        this.regularLoginMode = !this.regularLoginMode;
    }

    ngOnInit() {
        this._http.get('./assets/files/release.json')
            .map((res: Response) => res.json()).subscribe(data => {
                this.version = data.release;
                this.build = data.build;
                }
            );
    }
}

