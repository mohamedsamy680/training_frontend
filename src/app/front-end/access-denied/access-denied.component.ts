import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'portal-access-denied',
    templateUrl: './access-denied.component.html',
    styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

    ngOnInit(): void {
    }

    reLogin() {
        //localStorage.clear();
        this.router.navigate(['/']);
    }
}
