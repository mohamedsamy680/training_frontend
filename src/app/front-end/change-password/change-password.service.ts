import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataServiceV2 } from '../../shared/services/data.service-v2';
import { AppConfigService } from '../../shared/services/app-config.service';


@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService extends DataServiceV2 {

  constructor(
    private httpn: HttpClient,
    private appConfigs: AppConfigService) {
    super('app-users', appConfigs, httpn);
  }

  changePassword<T, TV>(userId: number, obj: T) {
    //console.log(this.currentUrl + '/change-user-password/' + userId);
    return this.httpn.post<TV>(this.currentUrl + '/change-user-password/' + userId, obj);
  }

}
