import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { BackEndGuard } from './shared/guards/back-end.guard';

import { FRONT_ROUTES } from './front-end/front-end-routing.module';
import { FrontLayoutComponent } from './front-end/front-layout/front-layout.component';
import { NotFoundComponent } from './front-end/not-found/not-found.component';


const appRoutes: Routes = [
  {
    path: '',
    component: FrontLayoutComponent,
    children: FRONT_ROUTES
  },
  {
    path: 'training',
    loadChildren: () => import('./back-end/back-end.module').then(mod => mod.BackEndModule),
    //canActivate: [LoggedInGuard],
    //canLoad: [BackEndGuard]
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
