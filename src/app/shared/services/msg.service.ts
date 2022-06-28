import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http/http';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  get isLtr() {
    return localStorage.getItem('lang') || localStorage.getItem('lang') === 'en';
  }

  toastrOptions =
    {
      closeButton: true,
      timeOut: 8000,
      enableHTML: true,
      progressBar: true,
      newestOnTop: true,
      positionClass: this.isLtr ? 'toast-top-left' : 'toast-top-right',
      preventDuplicates: true,
    };

  constructor(public toastr: ToastrService) { }

  showSuccess(msg: string, title?: string) {
    this.toastr.success(msg, title || 'Well done!', this.toastrOptions);
  }

  showError(msg: string, title?: string) {
    this.toastr.error(msg, title || 'Oops Error!', this.toastrOptions);
  }

  showWarning(msg: string, title?: string) {
    this.toastr.warning(msg, title || 'Warning!', this.toastrOptions);
  }

  showInfo(msg: string, title?: string) {
    this.toastr.info(msg, title || 'Info!', this.toastrOptions);
  }

  showToast() {
    this.toastr.info('This is a toast.', 'Toast', this.toastrOptions);
  }

  public handleErrorV2(error: HttpErrorResponse) {
    this.showErrorSamy(error.error.responseException.exceptionMessage, `Error (${error.error.statusCode})`);
  }

  public handleErrorV1(error: HttpErrorResponse) {
    this.showError(error.error, `Error (${error.error.statusCode})`);
  }

  // ---------------------------------

  showErrorSamy(msg: any, code?: string) {
    //console.log("ERROR inside msg service: ", msg);
    //this.toastr.error(msg.title, code || 'Oops Error!', this.toastrOptions);
    this.toastr.error(msg, code || 'Oops Error!', this.toastrOptions);
  }
}
