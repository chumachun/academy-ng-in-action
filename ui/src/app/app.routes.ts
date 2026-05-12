import { Params, Routes } from '@angular/router';
import { hasUserGuard } from './login/has-user-guard';
import { currentUserResolver } from './profile/settings/current-user-resolver';

export interface ProfileParams extends Params {
  username?: string;
}
type UserNameParam = keyof Pick<ProfileParams, 'username'>;

const userNameParam: UserNameParam = 'username';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.Login),
  },
  {
    path: 'main',
    loadComponent: () => import('./main/main').then(m => m.Main),
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat').then(m => m.Chat),
    canActivate: [hasUserGuard],
  },
  {
    path: 'list',
    loadComponent: () => import('./list/list').then(m => m.List),
    canActivate: [hasUserGuard],
  },
  {
    path: 'profile/edit',
    loadComponent: () =>
      import('./profile/settings/reactive-settings').then(m => m.ReactiveSettings),
    canActivate: [hasUserGuard],
    resolve: {
      user: currentUserResolver,
    },
  },
  {
    path: `profile/:${userNameParam}`,
    loadComponent: () => import('./profile/profile').then(m => m.Profile),
    canActivate: [hasUserGuard],
  },
  {
    path: 'profile',
    redirectTo: 'profile/',
    pathMatch: 'full',
  },
];
