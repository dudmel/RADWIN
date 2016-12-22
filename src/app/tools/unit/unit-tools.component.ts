import { Component, OnInit } from '@angular/core';
import { saveAs } from 'file-saver';
import { Store } from '@ngrx/store';
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs/Observable';
import { SwuService, ISwuMetaData } from './swu.service';
import { WModalService, SpinnerService, AppStore } from '../../blocks';
import { Consts, exLog, Resources } from '../../shared';

let swuUploadUrl = Consts.baseUrls.swuUpload;

@Component({
  selector: 'unit',
  providers: [SwuService],
  template: require('./unit-tools.component.html'),
  styleUrls: ['unit-tools.component.scss']
})

export class UnitToolsComponent implements OnInit {

  private isSwuInProcess: boolean;
  private isBackupInProcess: boolean;

  constructor(private _swuService: SwuService,
              private _spinnerService: SpinnerService,
              private _store: Store<AppStore>,
              private _modalService: WModalService) { }

  ngOnInit() {
    exLog('hello Unit Tools component');
  }


  canDeactivate(): Promise<boolean> | boolean {
    return true;
    // return Observable.fromPromise(Promise.resolve(this._modalService.activate()));
  }

  backupDevice() {
    this.isBackupInProcess = true;
    this._spinnerService.show('Backup in process...');

    // Method will stop monitor
    this._store.dispatch({ type: 'MONITOR_SUSPEND_ON' });

    this._swuService.startBackup()
      .subscribe(response => {
        // In case of server error, returned body will be json and binary
        this._spinnerService.hide();

        this._store.dispatch({ type: 'MONITOR_SUSPEND_OFF' });
        this.isBackupInProcess = false;
        if (response && response['_body'].type === 'application/json') {
          this._modalService.activate(Resources.backupFailed, Resources.error, undefined, '', Consts.ModalType.error);
        } else {
          let backupFileName = Consts.ip + '_' + new Date().toLocaleDateString('en-GB').replace(/\//g, '.')
          backupFileName = backupFileName + '.backupl';
          let blob = new Blob([response['_body']], { type: 'application/octet-stream' });
          saveAs(blob, backupFileName);
        }
      });
  }

}
