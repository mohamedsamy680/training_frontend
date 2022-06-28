import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { MatModulesModule } from '../shared/modules/mat-modules/mat-modules.module';

import { BACK_ROUTES } from './back-end-routing.module';

import { BackLayoutComponent } from './back-layout/back-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    BackLayoutComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MatModulesModule,
    RouterModule.forChild(BACK_ROUTES)
  ]
})
export class BackEndModule { }
