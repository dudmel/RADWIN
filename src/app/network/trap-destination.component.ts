import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';
import { INetworkModel, ITrapDestination } from './network.model';
import { Observable } from 'rxjs/Rx';
import { WModalService, ip4Validator, minMaxNumberValidator } from '../blocks';
import { exLog } from '../shared';

@Component({
    selector: 'trap-comp',
    template: require('./trap-destination.component.html'),
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['network.styles.scss']
})

export class TrapComponent implements OnInit {
    @Input() trap: ITrapDestination;
    private form: FormGroup;
    private securityModel: string = 'SNMPv1';
    private trapform: FormGroup;
    @Output() trapChange = new EventEmitter;
    @Output() trapValidityRequestEvent = new EventEmitter;

    constructor(private _formBuilder: FormBuilder) {
        this.trapform = _formBuilder.group({
            hostIp: ['', ip4Validator],
            hostPort: ['', Validators.compose([minMaxNumberValidator(1, 65535)])],
            securityModel: ['']
        });
    }
 
    ngOnInit() {
    }

    checkTraps(ev) {
        this.trapChange.emit(ev.target.value );
    }

    trapValidityRequest() {
        this.trapValidityRequestEvent.emit(this.trapform.valid);
    }
}
