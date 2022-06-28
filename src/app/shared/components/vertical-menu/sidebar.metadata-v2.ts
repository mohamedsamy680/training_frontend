
// Sidebar route metadata
export interface IRouteInfoV2 {
  path: string;
  title: string;
  canAppear: boolean;
  icon: string;
  class: string;
  badge: string;
  badgeClass: string;
  isExternalLink: boolean;

  submenu: IRouteInfoV2[];
}
export interface IPageInfoV2 {
  pageUrl: string;
  actionId: number;
}
