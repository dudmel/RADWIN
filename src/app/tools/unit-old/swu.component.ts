import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader, ParsedResponseHeaders, FileUploaderOptions } from 'ng2-file-upload';
import { FileItem } from 'ng2-file-upload/file-item.class';
import { Observable } from 'rxjs/Observable';
import { SwuService, ISwuMetaData } from './swu.service';
import { WModalService } from '../../blocks';
import { Consts, exLog, Resources } from '../../shared';
import { saveAs } from 'file-saver';
import { AppStore } from '../../blocks';
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

  public uploader: RadFileUploader;
  private title: string;
  private fileType: string;
  private swuData: ISwuMetaData;
  private isInProcess: boolean = false;
  private isValidating: boolean = false;
  private subscription: any;
  private monitorSuspend: boolean;
  private isErrorOccurred: boolean;

  constructor(private _swuService: SwuService, private _store: Store<AppStore>,
    private _modalService: WModalService) { }

  ngOnInit() {
    exLog('hello Swu component, type:' + this.type);
    if (this.type === 'swu') {
      this.title = 'Software Upgrade';
      this.fileType = '.swul';
    } else {
      this.title = 'Restore';
      this.fileType = '.backupl';
    }

    this.uploader = new RadFileUploader({
      url: swuUploadUrl + '?mode=' + this.type,
      isHTML5: true,
      authToken: Consts.jwtPrefix + localStorage.getItem(Consts.jwtToken)
    });

    this.subscription = this.uploader.completeItemEvent.subscribe(this.validateSwu);

    //this.validateSwu();
  }

  ngOnDestroy() { this.subscription.unsubscribe(); }

  validateSwu() {
    this.swuData = <ISwuMetaData>{};
    this._store.dispatch({ type: 'MONITOR_SUSPEND_ON' });
    this.isValidating = true;

    this._swuService.getSwuState(this.type)
      .subscribe((swudata: ISwuMetaData) => {
        this._store.dispatch({ type: 'MONITOR_SUSPEND_OFF' });
        this.isValidating = false;
        this.swuData = <ISwuMetaData>(swudata);

        this.isErrorOccurred = this.swuData.error != null
      });
  }

  canDeactivate(): any {
    return true;
  }

  startSwu() {
    this.isInProcess = true;
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

  exLogAndUpload(item) {
    console.log(item);
    this.uploader.uploadItem(item);
  }
  startProcess() {

    this._store.dispatch({ type: 'MONITOR_SUSPEND_ON' });

    this._swuService.startSwu(this.type)
      .subscribe((swudata: ISwuMetaData) => {
        this.isInProcess = false;

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

  uploadStart() {
    exLog('uploading started');
  }

  swuBrowseButtonState() {
    if (this.isErrorOccurred)
      return true

    return this.isInProcess;
  }

  swuStartButtonState() {
    return !this.swuData;
  }
}

export class RadFileUploader extends FileUploader {

  @Output() completeItemEvent = new EventEmitter();

  constructor(options: FileUploaderOptions) {
    super(options);
  }

  public onCompleteItem(item: any, response: string, status: number, headers: ParsedResponseHeaders): any {

    this.completeItemEvent.emit()

    super.onCompleteItem(item, response, status, headers)
  }
}
