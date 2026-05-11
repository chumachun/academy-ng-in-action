import { Component, input } from '@angular/core';
import { UserModel } from '../../user/user-model';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.scss',
})
export class ProfileView {
  readonly user = input.required<UserModel>();
}
