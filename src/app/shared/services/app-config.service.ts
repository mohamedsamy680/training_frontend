import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
//import { Observable } from 'rxjs';
import { IAppConfig } from '../interfaces/app-config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private config: IAppConfig = { apiBaseUrl:'',firebasePath:'' };
    constructor(private http: HttpClient) { }

    get getConfig() {
        return this.config;
    }

    load() {
        let promise = this.http.get('assets/app-config.json').toPromise();
        //console.log("promise: ", promise);

        promise.catch((error: any): any => {
                    console.log('Configuration file "env.json" could not be read');
                    console.log('Configuration error: ', error);
                    //resolve(true);

                    //return Observable.throw(error);
                    return throwError(error.error || 'Server error');
                })
          .then((envResponse: IAppConfig) => {
            //console.log("envResponse: ", envResponse);
                    this.config = envResponse;
                });
        return promise;
    }
}
