export namespace Resources {
    'use strict';

    export let wrongUserPassword = `Wrong username or password`;
    export let loginTitle = 'Login';

    export let timeout = 'Timeout occured';
    export let tokenExpiration = 'Session timeout, please re-login';
    export let error = 'Error';

    export let changeBandSuccess = 'Change Band Successfully';
    export let reseting = 'Device is about to reset';
    export let changeBandWarning = 'Are you sure you want to change band ?';
    export let warning = 'Warning';

    export let pingInProgressWarning = 'Ping in progress, are you sure you want to cancel ?';
    export let traceInProgressWarning = 'Trace in progress, are you sure you want to cancel ?';
    export let speedTestInProgressWarning = 'Speed Test in progress, are you sure you want to cancel ?';
    export let resultWillShownHere = 'Result will shown here';

    export let resetWarning = 'Are you sure you want to reset ?';
    export let resyncWarning = 'Are you sure you want to resync ?';
    export let spectrumWarning = `This operation will cause the HSU to stop service for up to {0} 
    sec or until Stop button pressed. Are you sure you want to start Spectrum Analysis ?`;

    export let changeLinkPasswordSuccess = `Link Password changed successfully`;
    export let changeLinkPasswordFailure = `Link Password failed`;

    export let changeIpParamsWarning = 'You have set new IP Configuration and the connection will be reset.\n All changes made on this page will be discarded.\n Continue ?';

    export let changeMngVlanWarning = 'Enabling the VLAN tagging inhibits access from non VLAN tagged sources.\n Do not enable VLAN unless you are sure you can generate/receive VLAN tagged traffic.\n Continue ?';

    export let activateDeviceWarning = 'You are about to activate an HSU. Please make sure you know exactly the HBS location for alignment.\n Continue ?';

    export let restoreWarning = `You are about to restore device to release {0}.\n Some of the current configuration settings may be lost.\n Do you wish to continue ?`;

    export let backupFailed = 'Backup Failed';
}
