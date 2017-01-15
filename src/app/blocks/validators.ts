import { FormControl, FormGroup } from '@angular/forms';

let ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export function ip4Validator(control: FormControl): { [s: string]: boolean } {
  if (!control.value || control.value === undefined)
    return {invalidIp4: false};
  if (!control.value.match(ipRegex)) {
    return {invalidIp4: true};
  }
  return null;
}

export function wifiIpValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value || control.value === undefined)
        return {invalidWifiIp: false};
    let ip = control.value;
    if (!ip.startsWith('192.168.')) {
        return {invalidWifiIp: true};
    }
    return null;
}

export function ipParamsValidator(group: FormGroup): { [s: string]: boolean } {
  if (!group.value.hsuDefaultGateway || group.value.hsuDefaultGateway === undefined ||
      !group.value.hsuSubnetMask || group.value.hsuSubnetMask === undefined ||
      !group.value.hsuIp || group.value.hsuIp === undefined)
    return {invalidIpParams: true};

    // Convert ips to numeric
    let ip = convertIpToNumeric(group.value.hsuIp);
    let mask = convertIpToNumeric(group.value.hsuSubnetMask);
    let gw = convertIpToNumeric(group.value.hsuDefaultGateway);

    if ((ip & mask) != (gw & mask)) {
        return {invalidIpParams: true};
    }

    return null;
  }

export function matchingPasswordsValidator(group: FormGroup): { [s: string]: boolean } {
    if (group.value.newPassword !== group.value.confirmPassword) {
        return { passwordsMismatch: true };
    }

    return null;
  }

function convertIpToNumeric(ip: string): number {
    if (!ip)
        return 0;

    try {
        let splitted = ip.split('.');
        let a = +splitted[0] * 16777216;
        let b = +splitted[1] * 65536;
        let c = +splitted[2] * 256;
        let d = +splitted[3];
        return a + b + c + d ;
    } catch (error) {
        return 0;
    }
}

export function restrictedCharsValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value || control.value === undefined)
        return { invalidChars: false };

    if (!control.value.match(/^[^,;%]+$/)) {
        return { invalidChars: true };
    }
}

export function invalidPasswordValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value || control.value === undefined)
        return { invalidPassword: false };

    if (!control.value.match(/^[^.*@?|# ]+$/)) {
        return { invalidPassword: true };
    }
}

export function minMaxNumberValidator(min: number, max: number) {
    return (control: FormControl): { [s: string]: boolean } => {
        if (control.value === undefined || control.value === '')
            return null;

        if (control.value < min || control.value > max) {
            return { invalidMinMax: true };
        }

        return null;
    };
}

export function spectrumRangeValidator(group: FormGroup): { [s: string]: boolean } {
  if (!group.value.minAirFrequency || group.value.minAirFrequency === undefined ||
      !group.value.maxAirFrequency || group.value.maxAirFrequency === undefined)
    return {invalidSpectrumRange: false};

    if (group.value.maxAirFrequency - group.value.minAirFrequency > 500 ) {
     return {invalidSpectrumRange: true};
    }

    return null;
  }


export function ntpServerValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value || control.value === undefined)
    return {invalidNtpServer: false};
  if (!control.value.match(ipRegex) || control.value === '255.255.255.255') { //control.value === '0.0.0.0' ||
    return {invalidNtpServer: true};
  }
}