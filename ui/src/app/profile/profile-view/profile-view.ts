import { Component, input } from '@angular/core';
import { UserModel } from '../../user/user-model';
import { DatePipe } from '@angular/common';
import { AgePipe } from './age-pipe';

@Component({
  selector: 'app-profile-view',
  imports: [DatePipe, AgePipe],
  templateUrl: './profile-view.html',
  styleUrl: './profile-view.scss',
})
export class ProfileView {
  readonly user = input.required<UserModel>();
}
