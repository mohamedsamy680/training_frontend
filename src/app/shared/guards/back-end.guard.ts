import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MsgService } from '../services/msg.service';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class BackEndGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router,
    private msg: MsgService

  ) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    let logged = this.authService.isLoggedIn();

    if (!logged) {
      //localStorage.clear();
      this.router.navigate(['/login']);
      this.msg.showError('You are not supposed to access this.', 'Access Denied!');
      return false;
    }
    return true;
  }

}
