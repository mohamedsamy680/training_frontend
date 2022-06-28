import {
  homeRoute,
} from '../../interfaces/template-route';
import { IRouteInfoV2 } from './sidebar.metadata-v2';

//Sidebar menu Routes and data
export const SIDEBAR_VERTICAL_ROUTES: IRouteInfoV2[] = [

  { path: homeRoute, title: 'Home', canAppear: false, icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

  //To be deleted
  //{ path: 'https://pixinvent.com/apex-angular-4-bootstrap-admin-template/documentation', title: 'Documentation', canAppear: false, icon: 'ft-book', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
  //{ path: 'https://pixinvent.ticksy.com/', title: 'Support', canAppear: false, icon: 'ft-life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }

];
