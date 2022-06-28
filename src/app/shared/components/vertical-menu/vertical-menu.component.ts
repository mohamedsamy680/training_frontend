import { Component, OnInit, ViewChild, OnDestroy, ElementRef, Renderer2, AfterViewInit, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { customAnimations } from "../../animations/custom-animations";
import { MsgService } from '../../services/msg.service';
import { BackBaseComponent } from '../../back-base/back-base.component';

import { ConfigService } from '../../services/config.service';
import { LayoutService } from '../../services/layout.service';
import { WrappedResponse } from '../../data/api-data';
import { SIDEBAR_HORIZONTAL_ROUTES } from '../horizontal-menu/navigation-routes.config';
import { SIDEBAR_VERTICAL_ROUTES } from './vertical-menu-routes.config';
import { IRouteInfoV2 } from './sidebar.metadata-v2';
import { IPageInfoV2 } from './sidebar.metadata-v2';
import { SideBarServiceV2 } from './side-bar.service-v2';

const helper = new JwtHelperService();

@Component({
  selector: "app-sidebar",
  templateUrl: "./vertical-menu.component.html",
  animations: customAnimations
})
export class VerticalMenuComponent extends BackBaseComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('toggleIcon') toggleIcon: ElementRef;
  menuItems: any[];
  level: number = 0;
  logoUrl = 'assets/img/logo.png';
  public config: any = {};
  protected innerWidth: any;
  layoutSub: Subscription;
  configSub: Subscription;
  perfectScrollbarEnable = true;
  collapseSidebar = false;
  resizeTimeout;

  transparentBGClass = "";
  menuPosition = 'Side';

  constructor(
    private router: Router,
    public translate: TranslateService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private deviceService: DeviceDetectorService,
    private menuServiceV2: SideBarServiceV2,
    private msg: MsgService
  ) {
    super(null, msg, null);

    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;
    this.isTouchDevice();
  }


  ngOnInit() {

    //#NEW WAY
    //let tok = helper.decodeToken(localStorage.getItem('token'));
    //console.log("tok: ", tok);
    //if (localStorage.getItem('menu') && JSON.parse(localStorage.getItem('menu')).length > 0) {

      //#SOLVING THE PROBLEM OF SIDE MENU NOT APPEAR WHEN ALREADY LOGGED IN AND GIT MENU FROM LOCAL STORAGE
      //Promise.resolve().then(a => {
        //console.log("LOCAL STORAGE MENU GET FROM STORAGE: ", JSON.parse(localStorage.getItem('menu')));
        //this.menuItems = JSON.parse(localStorage.getItem('menu'));
        //console.log("MENU: ", this.menuItems);
      //});

    //} else {

      //this.menuServiceV2.getByIdGeneralV2<WrappedResponse<IPageInfoV2[]>>(tok.sub)
      //  .subscribe(response => {
      //    //console.log("authorized menu: ", response);
      //    this.menuItems = this.allowedPages(SIDEBAR_VERTICAL_ROUTES, response.result);
      //    // console.log("allowed pages: ", this.menuItems);
      //    //localStorage.setItem('menu', JSON.stringify(this.menuItems));
      //    //console.log("LOCAL STORAGE MENU INSERT INTO STORAGE WHEN LOGIN: ", JSON.parse(localStorage.getItem('menu')));

      //  }, error => this.msg.handleErrorV2(error));
    //}

  }

  //#NEW WAY
  allowedPages(routes: IRouteInfoV2[], pages: IPageInfoV2[]) {
    let tok = helper.decodeToken(localStorage.getItem('token'));
    if (tok) {
      //console.log('routes: ', routes);
      //console.log('pages: ', pages);
      for (let i = 0; i < routes.length; i++) {
        routes[i].canAppear = false;
        if (routes[i].path === '') { // has sub
          for (let j = 0; j < routes[i].submenu.length; j++) {
            routes[i].submenu[j].canAppear = false;
            if (routes[i].submenu[j].path === '') { // has sub;
              for (var k = 0; k < routes[i].submenu[j].submenu.length; k++) {
                if (pages.findIndex(a => a.pageUrl === routes[i].submenu[j].submenu[k].path) > -1) {
                  routes[i].submenu[j].submenu[k].canAppear = true;
                  routes[i].submenu[j].canAppear = true;
                  routes[i].canAppear = true;
                  continue;
                }
              }
            } else { // root on sub1
              if (pages.findIndex(a => a.pageUrl === routes[i].submenu[j].path) > -1) {
                routes[i].submenu[j].canAppear = true;
                routes[i].canAppear = true;
                continue;
              }
            }
          }
        } else { // root on menu
          if (pages.findIndex(a => a.pageUrl === routes[i].path) > -1) {
            routes[i].canAppear = true;
            continue;
          }
        }
      }
      return routes;
    }
    return [];
  }



  ngAfterViewInit() {

    this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();

    });

    this.layoutSub = this.layoutService.overlaySidebarToggle$.subscribe(
      collapse => {
        if (this.config.layout.menuPosition === "Side") {
          this.collapseSidebar = collapse;
        }
      });

    //ERR: ERROR Error: NG0100: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'undefined'. Current value: '[object Object]
    this.cdr.detectChanges();
  }


  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
      if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
      }
      this.resizeTimeout = setTimeout((() => {
        this.innerWidth = event.target.innerWidth;
          this.loadLayout();
      }).bind(this), 500);
  }

  loadLayout() {

    if (this.config.layout.menuPosition === "Top") { // Horizontal Menu
      if (this.innerWidth < 1200) { // Screen size < 1200
        this.menuItems = SIDEBAR_HORIZONTAL_ROUTES;
      }
    }
    else if (this.config.layout.menuPosition === "Side") { // Vertical Menu{
      this.menuItems = SIDEBAR_VERTICAL_ROUTES;
    }




    if (this.config.layout.sidebar.backgroundColor === 'white') {
      this.logoUrl = 'assets/img/logo-dark.png';
    }
    else {
      this.logoUrl = 'assets/img/logo.png';
    }

    if(this.config.layout.sidebar.collapsed) {
      this.collapseSidebar = true;
    }
    else {
      this.collapseSidebar = false;
    }
  }

  toggleSidebar() {
    
    let conf = this.config;
    conf.layout.sidebar.collapsed = !this.config.layout.sidebar.collapsed;
    this.configService.applyTemplateConfigChange({ layout: conf.layout });

    setTimeout(() => {
      this.fireRefreshEventOnWindow();
    }, 300);
  }

  fireRefreshEventOnWindow = function () {
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("resize", true, false);
    window.dispatchEvent(evt);
  };

  CloseSidebar() {
    this.layoutService.toggleSidebarSmallScreen(false);
  }

  isTouchDevice() {

    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();

    if (isMobile || isTablet) {
      this.perfectScrollbarEnable = false;
    }
    else {
      this.perfectScrollbarEnable = true;
    }

  }


  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }

  }

}
