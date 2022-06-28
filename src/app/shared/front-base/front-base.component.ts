import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';
import { MsgService } from '../services/msg.service';
//import * as Sentry from '@sentry/browser';

const helper = new JwtHelperService();

@Component({
  selector: 'template-front-base',
  templateUrl: './front-base.component.html',
  styleUrls: ['./front-base.component.scss']
})
export class FrontBaseComponent implements OnInit {

  constructor(private msgs: MsgService) { }

  ngOnInit() {
  }

  get isLoggedIn() {
    return !helper.isTokenExpired(localStorage.getItem('token')) && new Date() < helper.getTokenExpirationDate(localStorage.getItem('token'));
  }

  get ltr() {
    return localStorage.getItem('lang') !== 'ar-EG';
  }

  extractError(error) {
    // Try to unwrap zone.js error.
    // https://github.com/angular/angular/blob/master/packages/core/src/util/errors.ts
    if (error && error.ngOriginalError) {
      error = error.ngOriginalError;
    }

    // We can handle messages and Error objects directly.
    if (typeof error === 'string' || error instanceof Error) {
      this.msgs.showError(error || error['message'].toString());
      return error;
    }

    // If it's http module error, extract as much information from it as we can.
    if (error instanceof HttpErrorResponse) {
      // The `error` property of http exception can be either an `Error` object, which we can use directly...
      if (error.error instanceof Error) {
        this.msgs.showError(error.error.message);
        return error.error;
      }

      // ... or an`ErrorEvent`, which can provide us with the message but no stack...
      if (error.error instanceof ErrorEvent) {
        this.msgs.showError(error.error.message);
        return error.error.message;
      }

      // ...or the request body itself, which we can use as a message instead.
      if (typeof error.error === 'string') {
        this.msgs.showError(`Code: ${error.status} - ${error.error}.`);
        return `Server returned code ${error.status} with body '${error.error}'`;
      }
      this.msgs.showError(error.message);
      // If we don't have any detailed information, fallback to the request message itself.
      return error.message;
    }

    // Skip if there's no error, and let user decide what to do with it.
    return null;
  }

  public handleError(error: HttpErrorResponse) {
    let extractedError = this.extractError(error) || 'Handled unknown error';

    // Capture handled exception and send it to Sentry.
    //const eventId = Sentry.captureException(extractedError);

    // When in development mode, log the error to console for immediate feedback.
    if (!environment.production) {
      console.error(extractedError);
    }

    // Optionally show user dialog to provide details on what happened.
    //Sentry.showReportDialog({ eventId });
  };

}
