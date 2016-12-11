
import { Component, OnInit, OnDestroy, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ModalResult, ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { WModalService } from './modal.service';
import { Consts } from '../../shared';
import { RestoreToDeaultsComponent } from '../../tools/operations/restoreToDefaults/restore-to-defaults-component';

const KEY_ESC = 27;

@Component({
    selector: 'rad-modal',
    template: require('./modal.component.html')
})

export class WModalComponent implements OnInit, OnDestroy {
    @ViewChild('modal') modal: ModalComponent;
    @ViewChild('innercomponent', {read: ViewContainerRef}) 
    private innercomponent: ViewContainerRef;   
    private negativeOnClick: (e: any) => void;
    private positiveOnClick: (e: any) => void;
    private title: string;
    private message: string;
    private okText: string;
    private cancelText: string;
    private modalType: Consts.ModalType;
    private factory: any;

    private _defaults = {
        modalType: Consts.ModalType.info,
        title: 'Confirmation',
        message: 'Do you want to cancel your changes?',
        cancelText: 'CANCEL',
        okText: 'OK'
    };

    constructor(private _modalService: WModalService, private _resolver: ComponentFactoryResolver) {
        _modalService.activate = this.activate.bind(this);
        _modalService.activateWithInnerTemplate = this.activateWithInnerTemplate.bind(this);
    }

    activate(message = this._defaults.message,
        title = this._defaults.title,
        okText = this._defaults.okText,
        cancelText = this._defaults.cancelText,
        modalType = this._defaults.modalType) {

        this.title = title;
        this.message = message;
        this.okText = okText;
        this.cancelText = cancelText;
        this.modalType = modalType;

        let promise = new Promise<boolean>((resolve, reject) => {
            this.negativeOnClick = (e: any) => resolve(false);
            this.positiveOnClick = (e: any) => resolve(true);
            this.modal.open();
        });

        document.onkeyup = (e: any) => {
            if (e.which === KEY_ESC) {
                this.modal.close();
                return this.negativeOnClick(undefined);
            }
        };

        return promise;
    }

    activateWithInnerTemplate(component: any) {

        let factory = this._resolver.resolveComponentFactory(component);
        this.innercomponent.clear();
        let componentRef = this.innercomponent.createComponent(factory);

        this.okText = this._defaults.okText;
        this.cancelText = this._defaults.cancelText;
        this.message = '';

        let promise = new Promise<any>((resolve, reject) => {
            this.negativeOnClick = (e: any) => resolve({responce: false, internalData: undefined});
            this.positiveOnClick = (e: any) => resolve({responce: true, internalData: componentRef.instance});
            this.modal.open();
        });
        return promise;
    }

    onOk(result: ModalResult) {
        this.positiveOnClick(undefined);
        this.tryClose();
    }

    onDismiss(result: ModalResult) {
        this.negativeOnClick(undefined);
        this.tryClose();
    }

    tryClose(){
        this.innercomponent.clear();
        this.modal.close();
    }

    ngOnInit() {
    }

    ngOnDestroy(){
    }

    getIconImg(): string {
        switch (this.modalType) {

            case Consts.ModalType.error:
                return '../../../assets/icon/notification.svg';
            case Consts.ModalType.info:
                return '../../../assets/icon/info.svg';
            case Consts.ModalType.warning:
                return '../../../assets/icon/warning.svg';
            case Consts.ModalType.question:
                return '../../../assets/icon/question.svg';
            default:
                return '../../../assets/icon/info.svg';
        }
    }
}
