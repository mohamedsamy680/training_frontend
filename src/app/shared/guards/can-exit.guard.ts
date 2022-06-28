import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { BackBaseComponent } from '../back-base/back-base.component';

@Injectable({
  providedIn: 'root'
})
export class CanExitGuard implements CanDeactivate<BackBaseComponent> {

  canDeactivate(component: BackBaseComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    //if (component.isFormSaved) {

    //    //Are you sure you want to 
    //    component.confirm('Navigate away? There are some unsaved work you will lose.').subscribe(a => {

    //        if (a) {
    //            return true;
    //        }

    //        return false;
    //    });

    //}

    return true;
  }
}
