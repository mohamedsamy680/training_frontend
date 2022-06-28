import { NgModule, ErrorHandler, Injectable, APP_INITIALIZER } from "@angular/core";

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { ToastrModule } from "ngx-toastr";
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from "./app-routing.module";

import { SharedModule } from "./shared/shared.module";
import { FrontEndModule } from './front-end/front-end.module';
import { BackEndModule } from './back-end/back-end.module';

import { UploadKendoInterceptor } from './shared/interceptors/upload-kendo.interceptor';

import { WINDOW_PROVIDERS } from './shared/services/window.service';

import { AppComponent } from "./app.component";
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { DeleteConfirmDialogComponent } from './shared/components/delete-confirm-dialog/delete-confirm-dialog.component';

import { environment } from '../environments/environment';

import { AppConfigService } from './shared/services/app-config.service';


//#TODO: to be commented
var firebaseConfig = {
  apiKey: "YOUR_API_KEY", //YOUR_API_KEY
  authDomain: "YOUR_AUTH_DOMAIN", //YOUR_AUTH_DOMAIN
  databaseURL: "YOUR_DATABASE_URL", //YOUR_DATABASE_URL
  projectId: "YOUR_PROJECT_ID", //YOUR_PROJECT_ID
  storageBucket: "YOUR_STORAGE_BUCKET", //YOUR_STORAGE_BUCKET
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", //YOUR_MESSAGING_SENDER_ID
  appId: "YOUR_APP_ID", //YOUR_APP_ID
  measurementId: "YOUR_MEASUREMENT_ID" //YOUR_MEASUREMENT_ID
};


//#Get token and send it by default in header of http/https requests
export function tokenGetter() {
  return localStorage.getItem('token');
}

//#In order to get the baseUrl from app-config.json using app-config.service
export function initConfig(config: AppConfigService) {
  return () => config.load();
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  entryComponents: [
    ConfirmDialogComponent,
    DeleteConfirmDialogComponent
  ],
  declarations: [
    AppComponent,
    ConfirmDialogComponent,
    DeleteConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(firebaseConfig), //#TODO: to be commented
    AngularFireAuthModule, //#TODO: to be commented
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    PerfectScrollbarModule,
    FrontEndModule,
    BackEndModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    }),
    //Config the jwt token auth
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        throwNoTokenError: false,
        skipWhenExpired: false,
        allowedDomains: environment.whiteList,
        disallowedRoutes: [
          //'https://localhost:44300/login',
          'http://localhost:4200/login'
        ]
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UploadKendoInterceptor, multi: true
    },
    //#In order to get the baseUrl from app-config.json using app-config.service
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AppConfigService],
      multi: true
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    WINDOW_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
