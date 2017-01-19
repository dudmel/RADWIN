
export namespace Consts {
  'use strict';

  export let mobileInnerWidth = 700;
  
  let url: string = window.location.protocol + '//' + window.location.hostname;
  export let ip = window.location.hostname;
  
  if ('production' === ENV) {
    // Production
  } else {
    url += ':5000';
  }

  export let timeoutRetries: number = 10;
  export let monitorInterval: number = 1000;
  export let jwtToken: string = 'jwt';
  export let jwtPrefix: string = 'JWT ';

  export let baseUrls = {
    auth: url + '/auth',
    system: url + '/api/v1/data/system',
    radio: url + '/api/v1/data/radio',
    recentEvents: url + '/api/v1/data/recent-events',
    activeAlarms: url + '/api/v1/data/active-alarms',
    network: url + '/api/v1/data/network',
    monitor: url + '/api/v1/data/monitor',
    wifi: url + '/api/v1/data/wifi',
    trapsDestinations: url + '/api/v1/data/traps-destinations',
    ping: url + '/api/v1/operations/ping',
    trace: url + '/api/v1/operations/trace',
    resync: url + '/api/v1/operations/resync',
    reset: url + '/api/v1/operations/reset',
    speed: url + '/api/v1/operations/speed-test',
    
    restoreToDefaults: url + '/api/v1/operations/restore-to-defaults',
    changeBand: url + '/api/v1/operations/change-band',
    activateLicense: url + '/api/v1/operations/activate-license',
    changeLinkPassword: url + '/api/v1/operations/change-link-password',
    diagnostics: url + '/api/v1/operations/diagnostics',
    // Swu
    swuStart: url + '/api/v1/operations/software-upgrade/start',
    swuValidate: url + '/api/v1/operations/software-upgrade/validate',
    swuUpload: url + '/api/v1/operations/software-upgrade/upload',
    swuBackup: url + '/api/v1/operations/software-upgrade/backup',
    checkFileExistence: url + '/api/v1/operations/software-upgrade/check-file-existence',
    // Spectrum
    spectrumStart: url + '/api/v1/operations/spectrum/start',
    spectrumStop: url + '/api/v1/operations/spectrum/stop',
    spectrumRange: url + '/api/v1/operations/spectrum/range',
    spectrumTable: url + '/api/v1/operations/spectrum/table',

    confirmationInstallation: url + '/api/v1/operations/installation-confirmation',

    skipAlignment: url + '/api/v1/alignment/action/skip'
  };


  export enum linkStates {
    linkOff = <any>'Not Synchronized',
    violated = <any>'Active Violated',
    unregistered = <any>'Active Unregistered',
    registered = <any>'Active',
    authenticationError = <any>'Active Authentication Error',
    swUpgradeRequired = <any>'Active SW Upgrade Required',
    registeredPassive = <any>'Active'
  }

  export enum ModalType {
    question = 1,
    info = 2,
    warning = 3,
    error = 4
  };

  export enum TrapType {
    Info = 1,
    Normal = 2,
    Warning = 4,
    Minor = 8,
    Major = 16,
    Critical = 32,
  };
}

