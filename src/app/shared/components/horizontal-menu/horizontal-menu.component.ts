import { Component, OnInit, ViewChild, OnDestroy, ElementRef, Renderer2, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { BackBaseComponent } from '../../back-base/back-base.component';

import { ConfigService } from '../../services/config.service';
import { LayoutService } from '../../services/layout.service';
import { WrappedResponse } from '../../data/api-data';
import { IRouteInfoV2 } from '../vertical-menu/sidebar.metadata-v2';
import { IPageInfoV2 } from '../vertical-menu/sidebar.metadata-v2';
import { SideBarServiceV2 } from '../vertical-menu/side-bar.service-v2';
import { MsgService } from '../../services/msg.service';
import { SIDEBAR_HORIZONTAL_ROUTES } from './navigation-routes.config';


const helper = new JwtHelperService();


@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss']
})
export class HorizontalMenuComponent extends BackBaseComponent implements OnInit, AfterViewInit, OnDestroy {

  public menuItems: any[];
  public config: any = {};
  level: number = 0;
  transparentBGClass = "";
  menuPosition = 'Side';

  layoutSub: Subscription;

  constructor(
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private menuServiceV2: SideBarServiceV2,
    private msg: MsgService,
    private router: Router,
    private layoutService: LayoutService
  ) {
    super(null, msg, null);

    this.config = this.configService.templateConf;
  }

  ngOnInit() {

    this.menuItems = SIDEBAR_HORIZONTAL_ROUTES;

    //#NEW WAY
    //let tok = helper.decodeToken(localStorage.getItem('token'));

    //if (localStorage.getItem('menu') && JSON.parse(localStorage.getItem('menu')).length > 0) {

    //this.menuItems = JSON.parse(localStorage.getItem('menu'));

    //} else {

    //this.menuServiceV2.getByIdGeneralV2<WrappedResponse<IPageInfoV2[]>>(tok.sub)
    //  .subscribe(response => {
    //    //console.log("authorized menu: ", response);
    //    this.menuItems = this.allowedPages(SIDEBAR_HORIZONTAL_ROUTES, response.result);
    //    //console.log("allowed pages: ", this.menuItems);
    //    //localStorage.setItem('menu', JSON.stringify(this.menuItems));

    //  }, error => this.msg.handleErrorV2(error));
    //}
  }

  //#NEW WAY
  // allowedPages(routes: IRouteInfoV2[], pages: IPageInfoV2[]) {
  //   let tok = helper.decodeToken(localStorage.getItem('token'));
  //   if (tok) {
  //     //console.log('routes: ', routes);
  //     //console.log('pages: ', pages);
  //     for (let i = 0; i < routes.length; i++) {
  //       routes[i].canAppear = false;
  //       if (routes[i].path === '') { // has sub
  //         for (let j = 0; j < routes[i].submenu.length; j++) {
  //           routes[i].submenu[j].canAppear = false;
  //           if (routes[i].submenu[j].path === '') { // has sub;
  //             for (var k = 0; k < routes[i].submenu[j].submenu.length; k++) {
  //               if (pages.findIndex(a => a.pageUrl === routes[i].submenu[j].submenu[k].path) > -1) {
  //                 routes[i].submenu[j].submenu[k].canAppear = true;
  //                 routes[i].submenu[j].canAppear = true;
  //                 routes[i].canAppear = true;
  //                 continue;
  //               }
  //             }
  //           } else { // root on sub1
  //             if (pages.findIndex(a => a.pageUrl === routes[i].submenu[j].path) > -1) {
  //               routes[i].submenu[j].canAppear = true;
  //               routes[i].canAppear = true;
  //               continue;
  //             }
  //           }
  //         }
  //       } else { // root on menu
  //         if (pages.findIndex(a => a.pageUrl === routes[i].path) > -1) {
  //           routes[i].canAppear = true;
  //           continue;
  //         }
  //       }
  //     }
  //     return routes;
  //   }
  //   return [];
  // }




  ngAfterViewInit() {

    this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();

    })
  }

  loadLayout() {

    if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != "") {
      this.menuPosition = this.config.layout.menuPosition;
    }


    if (this.config.layout.variant === "Transparent") {
      this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
    }
    else {
      this.transparentBGClass = "";
    }

  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

}
