import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataServiceV2 } from '../../../../../shared/services/data.service-v2';
import { AppConfigService } from '../../../../../shared/services/app-config.service';


@Injectable({
  providedIn: 'root'
})
export class JobTitleService extends DataServiceV2 {

  constructor(
    private https: HttpClient,
    private appConfigs: AppConfigService
  ) {
    super('job-title', appConfigs, https);
  }

  //#For Grid
  getAllJobTitles<T>() {
    return this.https.get<T>(this.currentUrl + '/get-all-job-titles');
  }

  //#For Insert
  saveJobTitle<T, TY>(ins: T) {
    return this.https.post<TY>(this.currentUrl + '/save-job-title', ins);
  }

  //#For Update
  updateJobTitle<T, TY>(jobTitleId: number, upd: T) {
    return this.https.put<TY>(this.currentUrl + '/update-job-title/' + jobTitleId, upd);
  }

  //For Delete
  deleteJobTitle<TY>(jobTitleId: number) {
    return this.https.delete<TY>(this.currentUrl + '/delete-job-title/' + jobTitleId);
  }
}
