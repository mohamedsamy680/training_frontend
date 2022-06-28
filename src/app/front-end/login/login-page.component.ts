import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/services/auth.service';
import { throwError } from 'rxjs';
import { FrontBaseComponent } from '../../shared/front-base/front-base.component';
import { MsgService } from '../../shared/services/msg.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent {

  loginFormSubmitted = false;
  isLoginFailed = false;

  loginForm = new FormGroup({
    username: new FormControl('guest@apex.com', [Validators.required]),
    password: new FormControl('Password', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  get lf() {
    return this.loginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.router.navigate(['/training']);
  }


}
