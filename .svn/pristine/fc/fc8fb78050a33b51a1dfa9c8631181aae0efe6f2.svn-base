import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {

  private _selector: string = 'preloader';
  private _messageSelector: string = 'spinner-message';
  private _element: HTMLElement;
  private _messageElement: HTMLElement;

  constructor() {
    this._element = document.getElementById(this._selector);
    this._messageElement = document.getElementById(this._messageSelector);
  }

  public show(message: string, autoHide?: boolean): void {
    this._element.style['display'] = 'block';
    this._messageElement.innerHTML = message;
    if (autoHide) {
      this.hide(2000);
    }
  }

  public hide(delay: number = 0): void {
    setTimeout(() => {
      this._element.style['display'] = 'none';
    }, delay);
  }
}
