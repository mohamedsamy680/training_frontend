import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import * as appGlobals from '../../app-globals';
import { AppConfigService } from './app-config.service';
import { DataServiceV2 } from './data.service-v2';
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from 'firebase/app'
import { Observable } from 'rxjs';


const helper = new JwtHelperService();

export enum ActionType {
  View = 1,
  Search,
  Save,
  Edit,
  Delete,
  Print,
  GenerateCode,
  Calculate,
  Approve,
  Reject,
  Upload,
  Download
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends DataServiceV2 {

  constructor(
    private https: HttpClient,
    private appConfigs: AppConfigService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
    super('tokens', appConfigs, https);
  }

  isLoggedIn() {

    let tok = localStorage.getItem('token');
    if (tok) {
      return !this.jwtHelper.isTokenExpired(tok) && new Date() < this.jwtHelper.getTokenExpirationDate(tok);
    }
    return false;
  }

  checkValidity() {
    let tok = helper.decodeToken(localStorage.getItem('token'));
    //console.log("TOKEN: ", tok);
    if (tok && tok.sub) {
      return this.get<any>(this.currentUrl + `/check-user-isActive-by-token/${tok.sub}`);
    }
    return null;
  }

  login(un: string, pw: string, provId?: number) {
    return this.save({ 'userName': un, 'password': pw }, this.currentUrl + '/generate-user-token');
  }




  authPriv(usId: number, pageName: string, action: ActionType = ActionType.View) {
    let us = { pageName: pageName, actionName: ActionType[action], userId: usId };
    //console.log("SAMY AUTH: ", us);
    return this.post<boolean>(us, appGlobals.localUrl + `privileges/authPageAction`);
  }


  authTokenExpire(userId: number) {
    //console.log(appGlobals.localUrl + 'privileges/auth-token-expire/' + userId);
    return this.get<boolean>(appGlobals.localUrl + 'privileges/auth-token-expire/' + userId);
  }

  getToken() {
    return this.jwtHelper.decodeToken();
  }

  getType(): string {
    if (!this.isLoggedIn()) {
      return '';
    }

    let tok = this.getToken();
    if (tok) {
      return tok.typ;
    }
    return '';
  }

  signOutAll() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  




  //private user: Observable<firebase.User>;
  //private userDetails: firebase.User = null;
  
  //constructor(public _firebaseAuth: AngularFireAuth, public router: Router) {
  //  this.user = _firebaseAuth.authState;
  //  this.user.subscribe(
  //    (user) => {
  //      if (user) {
  //        this.userDetails = user;
  //      }
  //      else {
  //        this.userDetails = null;
  //      }
  //    }
  //  );

  //}

  //signupUser(email: string, password: string) {
  //  //your code for signing up the new user
  //}

  //signinUser(email: string, password: string) {
  //  //your code for checking credentials and getting tokens for for signing in user
  //  // return this._firebaseAuth.signInWithEmailAndPassword(email, password)

  //  //uncomment above firebase auth code and remove this temp code
  //  return new Promise(function(resolve, reject) {
  //    setTimeout(function() {
  //      resolve(true);
  //    }, 1000);
  //  });

  //}

  //logout() {
  //  this._firebaseAuth.signOut();
  //  this.router.navigate(['YOUR_LOGOUT_URL']);
  //}

  //isAuthenticated() {
  //  return true;
  //}
}
