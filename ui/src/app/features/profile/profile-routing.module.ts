import { NgModule } from '@angular/core';
import { Routes, RouterModule, Params } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { hasUserGuard } from 'src/app/guards';

export interface ProfileParams extends Params {
  username?: string;
}
type UserNameParam = keyof Pick<ProfileParams, 'username'>;

const userNameParam: UserNameParam = 'username';

const routes: Routes = [
  // Exercise 3: Add new route here.
  {
    path: `profile/:${userNameParam}`,
    component: ProfileComponent,
    canActivate: [hasUserGuard],
  },
  {
    path: 'profile',
    redirectTo: 'profile/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
