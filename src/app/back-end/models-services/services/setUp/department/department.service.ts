import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataServiceV2 } from '../../../../../shared/services/data.service-v2';
import { AppConfigService } from '../../../../../shared/services/app-config.service';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService extends DataServiceV2 {

  constructor(
    private https: HttpClient,
    private appConfigs: AppConfigService
  ) {
    super('department', appConfigs, https);
  }

  //#For Grid
  getAllDepartments<T>() {
    return this.https.get<T>(this.currentUrl + '/get-all-departments');
  }

  //#For Insert
  saveDepartment<T, TY>(ins: T) {
    return this.https.post<TY>(this.currentUrl + '/save-department', ins);
  }

  //#For Update
  updateDepartment<T, TY>(departmentId: number, upd: T) {
    return this.https.put<TY>(this.currentUrl + '/update-department/' + departmentId, upd);
  }

  //For Delete
  deleteDepartment<TY>(departmentId: number) {
    return this.https.delete<TY>(this.currentUrl + '/delete-department/' + departmentId);
  }
}
