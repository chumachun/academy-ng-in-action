import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { User } from './user/user';
import { UserService } from './user/user-service';

@Component({
  selector: 'app-root',
  imports: [
    MatToolbar,
    MatToolbarRow,
    MatButton,
    RouterLink,
    RouterLinkActive,
    User,
    RouterOutlet,
    AsyncPipe,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  private readonly userService = inject(UserService);

  readonly user$ = this.userService.user$;
}
