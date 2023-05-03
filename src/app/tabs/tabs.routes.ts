import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'share',
        loadComponent: () =>
          import('../share/share.page').then((m) => m.SharePage),
      },
      {
        path: 'device',
        loadComponent: () =>
          import('../device/device.page').then((m) => m.DevicePage),
      },
      {
        path: 'about',
        loadComponent: () => 
          import('../about/about.page').then( m => m.AboutPage)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
