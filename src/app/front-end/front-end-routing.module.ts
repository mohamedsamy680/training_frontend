import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login/login-page.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';


export const FRONT_ROUTES: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'under-construction', component: UnderConstructionComponent },
  { path: 'access-denied', component: AccessDeniedComponent }


];

