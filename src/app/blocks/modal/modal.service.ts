import { Injectable } from '@angular/core';
import { Consts } from '../../shared';
import { Component} from '@angular/core';
import { ImodelResponce} from './modelResponce';

@Injectable()
export class WModalService {
  
  activate: (message?: string,
             title?: string,
             okText?: string,
             cancelText?: string,
             type?: Consts.ModalType) => Promise<Boolean>;

  activateWithInnerTemplate: (innerComponent: Component,
                              message?: string, 
                              title?: string,
                              okText?: string, 
                              cancelText?: string,
                              type?: Consts.ModalType) => Promise<ImodelResponce>;
}
