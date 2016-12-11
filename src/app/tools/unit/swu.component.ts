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
  private swuError: string
  private isInProcess: boolean = false;
  private isValidating: boolean = false;
  private subscription: any;
  private monitorSuspend: boolean;
  private isErrorOccurred: boolean;
  private validateAllowable: boolean;

  constructor(private _swuService: SwuService,
              private _store: Store<AppStore>,
              private _modalService: WModalService,
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
          console.log("item uploaded" + response);
          this._spinnerService.hide();
          this._store.dispatch({ type: 'MONITOR_SUSPEND_OFF' });
          this.validateAllowable = false;
          
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

  canDeactivate(): any {
    return true;
  }

  startSwu() {

    // in restore ask user
    if (this.type === 'restore') {
      let warningMessage = Resources.restoreWarning.replace('{0}', this.swuData.release);
      this._modalService.activate(warningMessage, Resources.warning, undefined, undefined, Consts.ModalType.warning)
        .then(responseOk => {
          if (responseOk) {
            this.startProcess();
          }
        });
    } else {
      // swu
      this.startProcess();
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
    
    this._swuService.startSwu(this.type)
      .subscribe((swudata: ISwuMetaData) => {

        this._spinnerService.hide();

        this._store.dispatch({ type: 'MONITOR_SUSPEND_OFF' });

        if (swudata.error) {
          this.swuData = swudata;
        } else {
          let message = this.title + ' completed, reseting';
          let p = Promise.resolve(this._modalService.activate(message, 'Info'));
          return Observable.fromPromise(p);
        }
      });
  }

    swuStartButtonState() {
    return this.swuData;
  }
}