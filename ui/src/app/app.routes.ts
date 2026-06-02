import { Params, Routes } from '@angular/router';

import { Chat } from './chat/chat';
import { List } from './list/list';
import { hasUserGuard } from './login/has-user-guard';
import { Login } from './login/login';
import { Main } from './main/main';
import { Profile } from './profile/profile';
import { currentUserResolver } from './profile/settings/current-user-resolver';
import { ReactiveSettings } from './profile/settings/reactive-settings';

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
    component: Login,
  },
  {
    path: 'main',
    component: Main,
  },
  {
    path: 'chat',
    component: Chat,
    canActivate: [hasUserGuard],
  },
  {
    path: 'list',
    component: List,
    canActivate: [hasUserGuard],
  },
  {
    path: 'profile/edit',
    component: ReactiveSettings,
    canActivate: [hasUserGuard],
    resolve: {
      user: currentUserResolver,
    },
  },
  {
    path: `profile/:${userNameParam}`,
    component: Profile,
    canActivate: [hasUserGuard],
  },
  {
    path: 'profile',
    redirectTo: 'profile/',
    pathMatch: 'full',
  },
];
