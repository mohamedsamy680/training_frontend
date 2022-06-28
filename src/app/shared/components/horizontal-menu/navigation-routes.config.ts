import {
  courseCategoryRoute,
  departmentRoute,
  homeRoute,
  jobTitleRoute,
} from '../../interfaces/template-route';
import { IRouteInfoV2 } from '../vertical-menu/sidebar.metadata-v2';


//Sidebar menu Routes and data
export const SIDEBAR_HORIZONTAL_ROUTES: IRouteInfoV2[] = [

  { path: homeRoute, title: 'Home', canAppear: true, icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
  {
    path: '', title: 'Setup', canAppear: true, icon: 'ft-sliders', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
      { path: departmentRoute, title: 'Departments', canAppear: true, icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: jobTitleRoute, title: 'Job Title', canAppear: true, icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: courseCategoryRoute, title: 'Course Category', canAppear: true, icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '', title: 'Courses', canAppear: true, icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '', title: 'Exams', canAppear: true, icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '', title: 'Add Article', canAppear: true, icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '', title: 'Course Request Index', canAppear: true, icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '', title: 'Websites Links', canAppear: true, icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '', title: 'Gifts', canAppear: true, icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '', title: 'Gifts Categories', canAppear: true, icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '', title: 'Users', canAppear: true, icon: '', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
    ]
  },
  {
    path: '', title: 'Course Request', canAppear: true, icon: 'ft-users', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
    ]
  },
  {
    path: '', title: 'Gifts Gallery', canAppear: true, icon: 'ft-lock', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
    submenu: [
    ]
  }
];
