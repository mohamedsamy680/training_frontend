import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { MsgService } from '../services/msg.service';

@Injectable({
  providedIn: 'root'
})
export class CanViewGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private msg: MsgService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let tok = this.auth.getToken();

    if (!this.auth.isLoggedIn()) {
      this.msg.showError('You do not have enough authority to access this.', 'Access Denied!');
      //localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }

    return this.auth.authPriv(tok.sub, state.url).pipe(map((value, index) => {
      //console.log("IS AUTH?! ", value);
      if ((value as any).result) {
        //console.log(" TRUE?!");
        return true;
      } else {
        //console.log("FALSE?!");
        this.msg.showError('You do not have enough authority to access this.', 'Access Denied!');
        //this.router.navigate(['/access-denied']);
        return false;
      }
    }));
  }

}
