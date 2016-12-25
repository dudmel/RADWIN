import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader, ParsedResponseHeaders, FileUploaderOptions } from 'ng2-file-upload';
import { FileItem } from 'ng2-file-upload/file-item.class';
import { Observable } from 'rxjs/Observable';
import { SwuService, ISwuMetaData } from './swu.service';
import { WModalService } from '../../blocks';
import { Consts, exLog, Resources } from '../../shared';
import { saveAs } from 'file-saver';
import { AppStore, SpinnerService } from '../../blocks';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

let swuUploadUrl = Consts.baseUrls.swuUpload;

@Component({
    selector: 'swu-component',
    providers: [SwuService],
    template: require('./swu.component.html'),
    styleUrls: ['unit-tools.component.scss']
})

export class SwuComponent implements OnInit, OnDestroy {
    @Input() type: string;

    public uploader: FileUploader;
    private title: string;
    // private uploadingItem: any;
    private fileType: string;
    private swuData: ISwuMetaData;
    private swuError: string;
    private isInProcess: boolean = false;
    private isValidating: boolean = false;
    private subscription: any;
    private monitorSuspend: boolean;
    private isErrorOccurred: boolean;
    private validateAllowable: boolean;

    constructor(private _swuService: SwuService,
                            private _store: Store<AppStore>,
                            private _modalService: WModalService,
                            private _router: Router,
                            private _spinnerService: SpinnerService) { }

    ngOnInit() {
        exLog('hello Swu component, type:' + this.type);

        this.validateAllowable = false;

        if (this.type === 'swu') {
            this.title = 'Software Upgrade';
            this.fileType = '.swul';
        } else {
            this.title = 'Restore';
            this.fileType = '.backupl';
        }

        this.uploader = new FileUploader({
            url: swuUploadUrl + '?mode=' + this.type,
            isHTML5: true,
            authToken: Consts.jwtPrefix + localStorage.getItem(Consts.jwtToken)
        });


        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {

            let respData = JSON.parse(response); 
            console.log("item uploaded" + respData);
            this._spinnerService.hide();
            this._store.dispatch({ type: 'MONITOR_SUSPEND_OFF' });
            this.validateAllowable = false;

            if (respData.error != undefined )
            {
                this._modalService.activate(respData.error.message, this.title, 'OK', '', Consts.ModalType.error);
                return;
            }
            
            this.validateSwu();
        };

        this.uploader.onBeforeUploadItem = () => {
                console.log("Begin upload");
                this._spinnerService.show('File Upload in process...');
                this._store.dispatch({ type: 'MONITOR_SUSPEND_ON' });
            };

        this.uploader.onAfterAddingFile = (fileItem: any) => {
            this.uploader.uploadAll();
        }

        this.checkFileExistance();
    }

    ngOnDestroy() {
        if (this.subscription != null)
            this.subscription.unsubscribe(); 
    }

    validateSwu() {
        this._spinnerService.show('File validation in process...');
        this.swuData = <ISwuMetaData>{};
        this._store.dispatch({ type: 'MONITOR_SUSPEND_ON' });
        
        this._swuService.getSwuState(this.type)
            .subscribe((swudataJason: any) => {

                this._store.dispatch({ type: 'MONITOR_SUSPEND_OFF' });
                this._spinnerService.hide();
                this.isValidating = false;
                this.swuData = <ISwuMetaData>(swudataJason.data);
                this.swuError = '';

                if (swudataJason.error != null) {
                    this.swuError = <string>(swudataJason.error.message);
                    this.isErrorOccurred = true;
                    this.swuData = null;
                    this.validateAllowable = false;
                    
                }
            });
    }

    checkFileExistance() {
            this.validateAllowable = false;
            this._swuService.checkFileExistance(this.type)
            .subscribe((data: any) => {
                if (data == null) 
                    return;
                if (data.message === 'true')
                    this.validateAllowable = true;
            });
    }

    canDeactivate(): Promise<boolean> | boolean {
        return true;
    }

    startSwu() {

        let warningMessage = '';
        // in restore ask user
        if (this.type === 'restore') {
            warningMessage = (this.type === 'restore') 
                ? Resources.restoreWarning.replace('{0}', this.swuData.release)
                : Resources.swuResetWarning

            this._modalService.activate(Resources.swuResetWarning, Resources.warning, undefined, undefined, Consts.ModalType.warning)
                .then(responseOk => {
                    if (responseOk) {
                        this.startProcess();
                    }
                });
        }
    }

    startProcess() {

        let msg = ''
        if (this.type === 'restore')
            msg = 'Restore in process...'
        else
            msg = 'Software upgrade in process...'

        this._spinnerService.show(msg);

        this._store.dispatch({ type: 'MONITOR_SUSPEND_ON' });
        
        this._swuService.startSwu(this.type).subscribe((swudata: ISwuMetaData) => {

                this._spinnerService.hide();

                this._store.dispatch({ type: 'MONITOR_SUSPEND_OFF' });

                if (swudata.error) {
                    this.swuData = swudata;
                } else {
                    let message = this.title + ' completed, reset will be performed';
                    this._modalService.activate(message, 'Info', "OK", null, Consts.ModalType.info)
                        .then(responce=> {
                            this.performReset();
                        })
                }
            });
    }

    swuStartButtonState() {
        return this.swuData;
    }

    performReset() {
        this._swuService.reset();
        this._router.navigate(['login']);
        // .subscribe(response => {
        //     if (!response.error) {
        //         this._router.navigate(['login']);
        //     } else {
        //         this._modalService.activate(Resources.unableToPerformOperation, Resources.error, "OK", null, Consts.ModalType.error)
        //     }
        // });
    }
}