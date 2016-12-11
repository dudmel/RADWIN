import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';
import { Observable } from 'rxjs/Observable';
import { OperationsService } from './operations.service';
import { WModalService, AppStore, minMaxNumberValidator, spectrumRangeValidator } from '../../blocks';
import { Resources, Consts, exLog } from '../../shared';
import { IMonitorModel } from '../../monitor';
import { SpectrumChart } from './spectrum-chart.options';
import { IRestoreToDefaultsData } from './restoreToDefaults/restore-to-defaults-data';
import { RestoreToDeaultsComponent } from './restoreToDefaults/restore-to-defaults-component';
import { SpectrumService, ISpectrumData, ISpectrumRange } from './spectrum.service';
import { Store } from '@ngrx/store';
import { saveAs } from 'file-saver';

let diagnosticsUrl = Consts.baseUrls.diagnostics;
let OFFSET: number = 100;

@Component({
  selector: 'unit',
  providers: [OperationsService, SpectrumService],
  template: require('./operations.component.html'),
  styleUrls: ['operations.component.scss']
})
export class OperationsComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) _chart;
  private spectrum: any;
  private spectrumRange: ISpectrumRange;
  private barChartOptions = SpectrumChart.barChartOptions;
  private barChartColors = SpectrumChart.barChartColors;
  private barChartLegend = SpectrumChart.legend;
  private barChartType = SpectrumChart.type;
  private barChartLabels: number[] = [];
  private spectrumForm: FormGroup;
  private licenseActivationForm: FormGroup;
  private duration: number = 120;
  private isActivationEnabled: boolean;
  private spectrumTestInProgress: boolean;
  private restoreData: IRestoreToDefaultsData;
  private spectrumSub;
  private spectrumRangeSub;
  private monitorSub;

  private barChartDataA: any[] = [
    { label: 'Current', data: [] },
    { label: 'Average', data: [] },
    { label: 'Max', data: [] }
  ];

  private barChartDataB: any[] = [
    { label: 'Current', data: [] },
    { label: 'Average', data: [] },
    { label: 'Max', data: [] }
  ];

  constructor(private _operationsService: OperationsService,
    private _router: Router,
    private _modalService: WModalService,
    private _spectrumService: SpectrumService,
    private _formBuilder: FormBuilder,
    private _store: Store<AppStore>) {

    this.spectrumForm = _formBuilder.group({
      minAirFrequency: [''],
      maxAirFrequency: [''],
      duration: ['', minMaxNumberValidator(60, 86400)]
    }, { validator: spectrumRangeValidator });

    this.licenseActivationForm = _formBuilder.group({
      key: ['', Validators.required]
    });
  }

  ngOnInit() {
    exLog('hello Operations component');
    this.spectrumSub = this._store.select('spectrum')
      .subscribe((spectrum: ISpectrumData) => {
        if (spectrum && spectrum.spectrumChannelFrequncy !== undefined) {
          this.barChartLabels = spectrum.spectrumChannelFrequncy;
          this.barChartDataA[0].data = spectrum.currentAntennaA.map(function (val) { return val + OFFSET; });
          this.barChartDataB[0].data = spectrum.currentAntennaB.map(function (val) { return val + OFFSET; });
          this.barChartDataA[1].data = spectrum.averageAntennaA.map(function (val) { return val + OFFSET; });
          this.barChartDataB[1].data = spectrum.averageAntennaB.map(function (val) { return val + OFFSET; });
          this.barChartDataA[2].data = spectrum.maxAntennaA.map(function (val) { return val + OFFSET; });
          this.barChartDataB[2].data = spectrum.maxAntennaB.map(function (val) { return val + OFFSET; });
          // console.table(this.barChartDataA)
        }
      });

    this.spectrumRangeSub = this._store.select('spectrumRange')
      .subscribe((range: ISpectrumRange) => {
        this.spectrumRange = range;
      });

    this.monitorSub = this._store.select('monitor')
      .subscribe((monitor: IMonitorModel) => {
        this.isActivationEnabled = monitor.hsuAirState === 'Alignment Required';
      });

    this._spectrumService.getRange();
    this._spectrumService.getLastSpectrumTable();
  }

  ngOnDestroy() {
    this.spectrumSub.unsubscribe();
    this.spectrumRangeSub.unsubscribe();
    this.monitorSub.unsubscribe();
  }

  startSpectrum() {
    exLog('starting spectrum');
    
    let durationStr = String(this.duration);
    let warningMessage = Resources.spectrumWarning.replace('{0}', durationStr);
    this._modalService.activate(warningMessage, Resources.warning, undefined, undefined, Consts.ModalType.warning)
      .then(responseOk => {
        if (responseOk) {
          let spectrumDurationTimer = window.setTimeout(() => this.stopSpectrum(), this.duration * 1000);
          this.spectrumTestInProgress = true;
          this._spectrumService.startSpectrum(this.spectrumForm.value);
        }
      });
  }

  stopSpectrum() {
    exLog('Stopping spectrum');
    this.spectrumTestInProgress = false;
    this._spectrumService.stopSpectrum();
  }

  getDiagnostics(e) {
    this._operationsService.getDiagnostics()
      .subscribe(response => {
        let data = JSON.stringify(response, null, 4);
        let diagnosticFileName = 'diagnostics_' + new Date().toLocaleDateString('en-GB').replace(/\//g, '.')
        diagnosticFileName = diagnosticFileName + '.json';
        let blob = new Blob([data], { type: 'application/json' });
        saveAs(blob, diagnosticFileName);
      });
  }

  reset(e) {
    this._modalService.activate(Resources.resetWarning, Resources.warning)
      .then(responseOk => {
        if (responseOk) {
          this._operationsService.reset()
            .subscribe(response => {
              if (response.code === '200') {
                this._router.navigate(['login']);
              }
            });
        }
      });
  }

  restoreToDefualtsPressed() {
    this._modalService.activateWithInnerTemplate(RestoreToDeaultsComponent)
      .then(userAction => {
        if (userAction.responce) {
          this._operationsService.restoreToDefaults((<RestoreToDeaultsComponent>userAction.internalData).data)
            .subscribe(response => {
              if (response.code === '200') {
                this._router.navigate(['login']);
              }
            });
        }
      });
  }

  resync(e) {
    this._modalService.activate(Resources.resyncWarning, Resources.warning)
      .then(responseOk => {
        if (responseOk) {
          this._operationsService.resync()
            .subscribe(response => {
              if (response.code === '200') {
                this._router.navigate(['login']);
              }
            });
        }
      });
  }

  activateLicense(key: string) {
    this._operationsService.setActivateLicense(this.licenseActivationForm.value.key)
      .subscribe(response => {
        this._operationsService.getActivateLicense()
          .subscribe(res => {
            this._modalService.activate(res.data.status, Resources.warning);
          });
      });
  }

  acitvateDevice(e) {
    this._modalService.activate(Resources.activateDeviceWarning, Resources.warning)
      .then(responseOk => {
        if (responseOk) {
          this._operationsService.activateDevice()
            .subscribe(response => {
              if (response.code === '200') {

              }
            });
        }
      });
  }

  canDeactivate(): any {
    return true;
  }

}
