import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable()
export class UploadKendoInterceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === 'saveKendoUrl') {
      const success = of(new HttpResponse({ status: 200 }));
      return success;
    }

    if (req.url === 'removeKendoUrl') {
      return of(new HttpResponse({ status: 200 }));
    }

    return next.handle(req);
  }
}
