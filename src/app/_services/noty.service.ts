import { Injectable } from '@angular/core';
import * as Noty from 'noty';

@Injectable({
  providedIn: 'root'
})
export class NotyService {
  constructor() {}
  private commonOption: Noty.Options = {
    timeout: 3000,
    layout: 'bottomRight',
    theme: 'sunset'
  };

  success(message: string) {
    new Noty({
      ...this.commonOption,
      type: 'success',
      text: message
    }).show();
  }

  info(message: string) {
    new Noty({
      ...this.commonOption,
      type: 'info',
      text: message
    }).show();
  }

  alert(message: string) {
    new Noty({
      ...this.commonOption,
      type: 'alert',
      text: message
    }).show();
  }

  warning(message: string) {
    new Noty({
      ...this.commonOption,
      type: 'warning',
      text: message
    }).show();
  }

  error(message: string) {
    new Noty({
      ...this.commonOption,
      type: 'error',
      text: message
    }).show();
  }

  pop(message: string) {
    new Noty({
      ...this.commonOption,
      text: message
    }).show();
  }
}
