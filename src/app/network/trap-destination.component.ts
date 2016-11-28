import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { INetworkModel, ITrapDestination } from './network.model';
import { Observable } from 'rxjs/Rx';
import { WModalService, ip4Validator } from '../blocks';
import { exLog } from '../shared';

@Component({
    selector: 'trap-comp',
    template: require('./trap-destination.component.html'),
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['network.styles.scss']
})

export class TrapComponent implements OnInit {
    @Input() trap: ITrapDestination;
    private securityModel: string = 'SNMPv1';
    private trapform: FormGroup;

    constructor(private _formBuilder: FormBuilder) {
        this.trapform = _formBuilder.group({
            hostIp: ['', ip4Validator],
            hostPort: [''],
            securityModel: ['']
        });
    }

    ngOnInit() {

    }
}
