import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataServiceV2 } from '../../../../../shared/services/data.service-v2';
import { AppConfigService } from '../../../../../shared/services/app-config.service';


@Injectable({
  providedIn: 'root'
})
export class CategoryService extends DataServiceV2 {

  constructor(
    private https: HttpClient,
    private appConfigs: AppConfigService
  ) {
    super('category', appConfigs, https);
  }

  //#For Grid
  getAllCategories<T>() {
    return this.https.get<T>(this.currentUrl + '/get-all-categories');
  }

  //#For Insert
  saveCategory<T, TY>(ins: T) {
    return this.https.post<TY>(this.currentUrl + '/save-category', ins);
  }

  //#For Update
  updateCategory<T, TY>(categoryId: number, upd: T) {
    return this.https.put<TY>(this.currentUrl + '/update-category/' + categoryId, upd);
  }

  //For Delete
  deleteCategory<TY>(categoryId: number) {
    return this.https.delete<TY>(this.currentUrl + '/delete-category/' + categoryId);
  }
}
