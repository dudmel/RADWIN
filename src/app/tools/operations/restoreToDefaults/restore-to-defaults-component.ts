import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { IRestoreToDefaultsData } from './restore-to-defaults-data';
import { RestoreToDefaultsData } from './restore-to-defaults-data';

@Component({
    selector: 'restore-to-deaults',
    template: require('./restore-to-defaults-component.html')
})

export class RestoreToDeaultsComponent {

    public data: IRestoreToDefaultsData;
    private resetIpWarningMessage: string;

    constructor() {
        this.data = new RestoreToDefaultsData();
        this.data.isDefaultIpRequired = false;

        this.resetIpWarningMessage = 'Default IP Address (10.0.0.120).';
    }

    onResetIpChanged(resetIpRequired: boolean) {
        this.data.isDefaultIpRequired = resetIpRequired;
    }
}
