import { Params, Routes } from '@angular/router';
import { Main } from './main/main';
import { Profile } from './profile/profile';
import { Chat } from './chat/chat';
import { List } from './list/list';
import { Login } from './login/login';
import { hasUserGuard } from './login/has-user-guard';
import { currentUserResolver } from './profile/settings/current-user-resolver';
import { Settings } from './profile/settings/settings';

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
    component: Settings,
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
