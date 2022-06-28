import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataServiceV2 } from '../../services/data.service-v2';
import { AppConfigService } from '../../services/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class SideBarServiceV2 extends DataServiceV2 {

  constructor(
    private https: HttpClient,
    private appConfigs: AppConfigService
  ) {
    super('menu-links', appConfigs, https);
  }


  getByIdGeneralV2<T>(userId: number) {
    return this.https.get<T>(this.currentUrl + '/get-all-menu-links/' + userId);
  }

}

