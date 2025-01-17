import { Component, OnInit, Input } from '@angular/core';


@Component({
    selector: 'link-state',
    template: `
                    <div class="info-box-icon">
                            <img [src]="getImg()"/>
                    </div>
                    <div class="info-box-content">
                        <span class="info-box-label">Status</span>
                        <span class="info-box-text" [ngClass]="linkState == 'Active Authentication Error' || linkState == 'Active SW Upgrade Required' ? 'sm-text' : ''">{{status}}</span>
                    </div>
                
            `,
    styleUrls: ['quick-look.styles.scss']
})

export class LinkStateComponent implements OnInit {

    private _linkState: string;
    private _airState: string;
    private status: string;

    @Input()
    set linkState(state: string) {
        if (state) {
            this._linkState = state;
            this.status = this.getCurrentStatus();
        }
    };

    get linkState() {
        return this._linkState;
    }

    @Input()
    set airState(state: string) {
        if (state) {
            this._airState = state;
            this.status = this.getCurrentStatus();
        }
    };

    get airState() {
        return this._airState;
    }

    constructor() { }

    ngOnInit() {
    }

    getImg() {
        switch (this.linkState) {
            case 'Not Synchronized':
                return '../../assets/icon/nosync.svg';
            case 'Active Violated':
                return '../../assets/icon/violated.svg';
            case 'Active Unregistered':
                return '../../assets/icon/unregistered.svg';
            case 'Active':
                return '../../assets/icon/registered.svg';
            case 'Active Authentication Error':
                return '../../assets/icon/authenticationerror.svg';
            case 'Active SW Upgrade Required':
                return '../../assets/icon/upgraderequired.svg';
            default:
                return '../../assets/icon/registered.svg';
        }
    }

    getCurrentStatus(): string {

        if (this._airState !== 'Active') {
            return this._airState;
        } else {
            return this._linkState;
        }
    }
}
