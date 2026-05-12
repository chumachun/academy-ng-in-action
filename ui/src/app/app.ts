import { Component, inject } from '@angular/core';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserService } from './user/user-service';
import { User } from './user/user';

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
