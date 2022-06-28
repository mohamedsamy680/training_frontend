import { HttpClient } from '@angular/common/http';
import { AppConfigService } from './app-config.service';

export class DataServiceV2 {

  get currentUrl() {
    return this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute;
  }

  constructor(private generalApiRoute, private appConfig: AppConfigService, private http: HttpClient) { }

  ////////////////////// Gateway //////////////////////
  search<T, TY>(obj: T, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.post<TY[]>(url + '/search', obj);
  }

  getAll<T>(url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.get<T[]>(url);
  }

  getAllById<T>(byId: number, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.get<T[]>(url + '/' + byId);
  }

  getAllBy<T, TY>(byId: TY, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.get<T[]>(url + '/' + byId);
  }

  getAllByIdN<T>(byId: number, byN: string, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.get<T[]>(url + '/' + byId + '/' + byN);
  }

  getById<T>(id: number, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.get<T>(url + '/' + id);
  }

  get<T>(url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.get<T>(url);
  }

  getCountById<T>(id: number, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.get<T>(url + '/' + id);
  }

  getBy<T, TY>(id: TY, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.get<T>(url + '/' + id);
  }
  ////////////////////////////////////////////////////////////////////////////////////////

  save<T>(ins: T, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.post<T>(url, ins);
  };

  saveV2<T, TY>(ins: TY, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.post<T>(url, ins);
  };

  update<T>(id: number, upd: T, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.put<T>(url + '/' + id, upd);
  };

  updateV2<T, TY>(id: number, upd: TY, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.put<T>(url + '/' + id, upd);
  };

  updateComposite<T>(upd: T, ...ids: number[]) {
    return this.http.put<T>(this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute + '/' + ids.join('/'), upd);
  };

  patch<T>(obj: any, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.patch<T>(url, obj);
  };

  delete(id: number, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.delete<number>(url + '/' + id);
  }

  deleteComposite<T>(...ids: number[]) {
    return this.http.delete<T>(this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute + '/' + ids.join('/'));
  };

  post<TRet>(upd: any, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    return this.http.post<TRet>(url, upd);
  }

  upload<T>(fileList: any, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    let formData: FormData = new FormData();
    if (fileList) {
      formData.append('uploadFile', fileList, fileList.name);
    }

    const httpOptions = {
      reportProgress: true,
    };

    return this.http.post<T>(url, formData, httpOptions);
  }

  saveWithUpload<T, TY>(ins: T, fileList: any, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    let formData: FormData = new FormData();
    if (fileList) {

      formData.append('uploadFile', fileList, fileList.name);

    }

    formData.append('stringObj', JSON.stringify(ins));

    const httpOptions = {
      reportProgress: true,
    };

    return this.http.post<TY>(url, formData, httpOptions);
  }

  saveWithUploadPutWithString<TY>(ins: string, fileList: any, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    let formData: FormData = new FormData();
    if (fileList) {

      formData.append('uploadFile', fileList, fileList.name);

    }

    formData.append('stringObj', ins);

    const httpOptions = {
      reportProgress: true,
    };

    return this.http.put<TY>(url, formData, httpOptions);
  }


  saveWithUploadMulti<T>(ins: T, fileList: any, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      for (var i = 0; i < fileList.length; i++) {
        formData.append('uploadFile', fileList[i], fileList[i].name);
      }
    }

    formData.append('stringObj', JSON.stringify(ins));

    const httpOptions = {
      reportProgress: true,
    };

    return this.http.post<T>(url, formData, httpOptions);
  }

  editWithUploadMulti<T>(ins: T, fileList: any, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      for (var i = 0; i < fileList.length; i++) {
        formData.append('uploadFile', fileList[i], fileList[i].name);
      }
    }

    formData.append('stringObj', JSON.stringify(ins));

    const httpOptions = {
      reportProgress: true,
    };

    return this.http.put<T>(url, formData, httpOptions);
  }

  insertWithUploadMultiLang<T>(ins: T, fileList: any, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      for (var i = 0; i < fileList.length; i++) {
        if (fileList[i].isArabic) {
          formData.append('uploadFile', fileList[i].rawFile, 'arb');
        } else {
          formData.append('uploadFile', fileList[i].rawFile, 'eng');
        }

      }
    }

    formData.append('stringObj', JSON.stringify(ins));

    const httpOptions = {
      reportProgress: true,
    };

    return this.http.post<T>(url, formData, httpOptions);
  }

  insertWithUploadMultiLangWithDifferentReturnType<T, TY>(ins: T, fileList: any, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      for (var i = 0; i < fileList.length; i++) {
        if (fileList[i].isArabic) {
          formData.append('uploadFile', fileList[i].rawFile, 'arb');
        } else {
          formData.append('uploadFile', fileList[i].rawFile, 'eng');
        }

      }
    }

    formData.append('stringObj', JSON.stringify(ins));

    const httpOptions = {
      reportProgress: true,
    };

    return this.http.post<TY>(url, formData, httpOptions);
  }


  updateWithUploadMultiLang<T>(ins: T, fileList: any, url: string = this.appConfig.getConfig.apiBaseUrl + this.generalApiRoute) {
    let formData: FormData = new FormData();
    if (fileList.length > 0) {
      for (var i = 0; i < fileList.length; i++) {
        if (fileList[i].isArabic) {
          formData.append('uploadFile', fileList[i].rawFile, 'arb');
        } else {
          formData.append('uploadFile', fileList[i].rawFile, 'eng');
        }

      }
    }

    formData.append('stringObj', JSON.stringify(ins));

    const httpOptions = {
      reportProgress: true,
    };

    return this.http.put<T>(url, formData, httpOptions);
  }
}
