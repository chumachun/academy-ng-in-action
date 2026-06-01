import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, from } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { ProfileParams } from '../app.routes';
import { List } from '../list/list';
import { UserModel } from '../user/user-model';
import { UserService } from '../user/user-service';

@Component({
  selector: 'app-profile',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, List, AsyncPipe],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
})
export class Profile {
  private readonly userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly users$ = from(this.userService.list());

  readonly currentProfile$ = combineLatest([this.users$, this.route.params]).pipe(
    map(([users, params]) => {
      const username = (params as ProfileParams)?.username;
      return users.find(u => u.name === username);
    }),
    shareReplay(1),
  );

  async selectProfile(user: UserModel | undefined) {
    if (user) {
      await this.router.navigate(['profile', user.name]);
    }
  }
}
