import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { MatModulesModule } from '../shared/modules/mat-modules/mat-modules.module';

import { FrontLayoutComponent } from './front-layout/front-layout.component';
import { LoginPageComponent } from './login/login-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { ErrorPageComponent } from './error/error-page.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    FrontLayoutComponent,
    LoginPageComponent,
    NotFoundComponent,
    AccessDeniedComponent,
    UnderConstructionComponent,
    ErrorPageComponent,
    //ConfirmEmailComponent,
    //ForgotPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MatModulesModule
  ]
})
export class FrontEndModule { }
