import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BackLayoutComponent } from './back-layout/back-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { LoggedInGuard } from '../shared/guards/logged-in.guard';
import { CanViewGuard } from '../shared/guards/can-view.guard';
import { TokenExpiredGuard } from '../shared/guards/token-expired.guard';

export const BACK_ROUTES: Routes = [

  {
    path: '', component: BackLayoutComponent, children: [

      { path: '', redirectTo: '/training/home', pathMatch: 'full' },
      { path: 'home', component: DashboardComponent, /*canActivate: [LoggedInGuard, TokenExpiredGuard, CanViewGuard]*/ },
      {
        path: 'setup',
        loadChildren: () => import('./set-up/set-up.module').then(mod => mod.SetUpModule)
      }
    ]
  }

];

