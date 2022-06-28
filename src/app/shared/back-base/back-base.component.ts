import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import * as appGlobals from '../../app-globals';
import { JwtHelperService } from "@auth0/angular-jwt";
import { FileState, FileRestrictions } from '@progress/kendo-angular-upload';
import { MsgService } from '../services/msg.service';
import { DeleteConfirmDialogComponent } from '../components/delete-confirm-dialog/delete-confirm-dialog.component';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { NgxSpinnerService } from "ngx-spinner";

const helper = new JwtHelperService();

@Component({
  selector: 'template-back-base',
  templateUrl: './back-base.component.html',
  styleUrls: ['./back-base.component.scss']
})
export class BackBaseComponent {
  isFormSaved = true;

  constructor(
    private dialogs: MatDialog,
    private msgs: MsgService,
    private spinnerLoader: NgxSpinnerService
  ) { }

  get uploadSaveUrl() { return 'saveKendoUrl'; } // 'api/upload-file';
  get uploadRemoveUrl() { return 'removeKendoUrl'; } // 'api/upload-file';
  get defaultBaseImageUrl() { return 'assets/img/logos/avatar-icon.png'; } // 'api/upload-file';

  get a2bDateFormat() {
    return appGlobals.dateFormat;
  }

  get currentUserCompanyId() {
    return 1;
  }

  get load() {
    return this.spinnerLoader.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
  }

  get hide() {
    return this.spinnerLoader.hide();
  }

  public showButton(state: FileState): boolean {
    return state === FileState.Uploaded;
  }
  public imgRestrict: FileRestrictions = {
    allowedExtensions: ['jpg', 'jpeg', 'png']
  };

  public docRestrict: FileRestrictions = {
    allowedExtensions: ['doc', 'docx', 'pdf']
  };

  get trainingPageSizeOptions() {
    return [50, 100, 200, 500, 1000];
  }

  getTomorrow() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }
  groupBy(xs, key) {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  viewerContainerStyle = {
    position: 'relative',
    sendEmail: { enabled: true },
    width: '1000px',
    height: '800px',
    ['font-family']: 'ms sans serif'
  };

  onUploadError(e: ErrorEvent) {
    this.msgs.showError(e.message);
  }

  public remove(upload, uid: string) {
    upload.removeFilesByUid(uid);
  }

  getTime(dt: string) {
    let hh = dt.substring(0, dt.indexOf(':')) || '0';
    let mm = dt.substring(3, 5) || '0';
    let ret = new Date();
    ret.setHours(parseInt(hh));
    ret.setMinutes(parseInt(mm));
    return ret;
  }

  get userTokenFullName() {
    let tok = helper.decodeToken(localStorage.getItem('token'));
    if (tok) {
      return tok.given_name;
    }
    return 'no token';
  }

  get userTokenRoleRank() {
    let tok = helper.decodeToken(localStorage.getItem('token'));
    if (tok) {
      return tok.RoleR;
    }
    return 'no token';
  }

  get userTokenId() {
    let tok = helper.decodeToken(localStorage.getItem('token'));
    if (tok) {
      return parseInt(tok.sub);
    }
    return -1;
  }

  get userCompanyId() {
    let tok = helper.decodeToken(localStorage.getItem('token'));
    if (tok) {
      //console.log("TOKEN: ", tok);
      //console.log("Token Comp Id: ", tok.CompId);
      return parseInt(tok.CompId);
    }
    return -1;
  }

  get userCompanyShortName() {
    let tok = helper.decodeToken(localStorage.getItem('token'));
    if (tok) {
      //console.log("TOKEN: ", tok);
      //console.log("Token Comp Id: ", tok.CompId);
      return tok.CompShortName;
    }
    return '';
  }

  get userCompanyImageUrl() {
    let tok = helper.decodeToken(localStorage.getItem('token'));
    if (tok) {
      //console.log("TOKEN: ", tok);
      //console.log("Token Comp Id: ", tok.CompId);
      return tok.CompImageUrl;
    }
    return '';
  }

  get userImage() {
    let img = localStorage.getItem('userImg');
    if (img || img != '' || img.trim() != '') {
      return img;
    }

    return 'assets/img/portrait/avatars/avatar-01.png';
  }

  get userRoleName() {
    let role = localStorage.getItem('userRole');
    if (role) {
      return role;
    }
    return 'No role';
  }

  get userOutletId() {
    let outId = localStorage.getItem('outId');
    if (outId) {
      return outId;
    }
    return 'No Outlet Id';
  }

  //get isLoggedIn() {
  //  return !helper.isTokenExpired(localStorage.getItem('token')) && new Date() < helper.getTokenExpirationDate(localStorage.getItem('token'));
  //}

  get ltr() {
    return localStorage.getItem('lang') !== 'ar-EG';
  }

  get dir() {
    return localStorage.getItem('lang') !== 'ar-EG' ? 'ltr' : 'rtl';
  }

  get lang() {
    return localStorage.getItem('lang');
  }

  openSearch<T>(component: ComponentType<any>, obj?: any) {
    return this.dialogs.open<T, any, T>(component, { minWidth: '80vw', disableClose: true, panelClass: 'no-padding-dialog', data: { obj: obj } }).afterClosed();
  }

  openAddEdit<T>(component: ComponentType<any>, obj: T, obj2?: any) {
    return this.dialogs.open<T, any, T[]>(component, { minWidth: '80vw', disableClose: true, panelClass: 'no-padding-dialog', data: { obj: obj, obj2: obj2 } }).afterClosed();
  }

  openAddEditSingle<T>(component: ComponentType<any>, obj: T, obj2?: any) {
    return this.dialogs.open<T, any, T>(component, { minWidth: '80vw', disableClose: true, panelClass: 'no-padding-dialog', data: { obj: obj, obj2: obj2 } }).afterClosed();
  }

  openAddEditDifferent<T, TV>(component: ComponentType<any>, obj: T, obj2?: any) {
    return this.dialogs.open<T, any, TV>(component, { minWidth: '80vw', disableClose: true, panelClass: 'no-padding-dialog', data: { obj: obj, obj2: obj2 } }).afterClosed();
  }

  openAddEditFull<T>(component: ComponentType<any>, obj: T, obj2?: any) {
    return this.dialogs.open<T, any, T[]>(component, { minWidth: '100vw', minHeight: '90vh', disableClose: true, panelClass: 'no-padding-dialog', data: { obj: obj, obj2: obj2 } }).afterClosed();
  }

  confirmDelete(stringDel: string) {
    return this.dialogs
      .open<any, any, string>(DeleteConfirmDialogComponent, { panelClass: 'no-padding-dialog', data: { delString: stringDel } })
      .afterClosed();
  }

  confirm(confirmMsg: string) {
    return this.dialogs
      .open<any, any, string>(ConfirmDialogComponent, { panelClass: 'no-padding-dialog', data: { confirmMsg: confirmMsg } })
      .afterClosed();
  }

  confirmWithInput<T, TY>(component: ComponentType<any>, obj: T, obj2?: any) {
    return this.dialogs
      .open<T, any, TY>(component, { panelClass: 'no-padding-dialog', data: { obj: obj, obj2: obj2 } })
      .afterClosed();
  }

  formatDate(dt: Date) {
    if (!dt) {
      return '';
    }
    return dt.getFullYear() + ' / ' + (dt.getMonth() + 1) + ' / ' + dt.getDate();
  }

  compareObjects(o1, o2) {
    for (let p in o1) {
      if (o1.hasOwnProperty(p)) {
        if (o1[p] && o1[p] !== o2[p]) {
          return false;
        }
      }
    }
    return true;
  };

  toLocaleDateString(date: Date) {
    //const options = {
    //    weekday: 'long', year: 'numeric', month: 'long',
    //    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
    //};
    return date.toLocaleDateString(/*'en-US', options*/);
  }

}
