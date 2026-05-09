import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { AsyncPipe } from '@angular/common';
import { List } from '../list/list';
import { ProfileParams } from '../app.routes';
import { UserModel, UserService } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss'],
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, List, AsyncPipe],
})
export class Profile {
  private readonly userService = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  currentProfile$ = from(this.userService.list()).pipe(
    switchMap(list => this.getCurrentFromList(list)),
  );

  private getCurrentFromList(list: UserModel[]) {
    return this.route.params.pipe(
      map(params => list.find(u => u.name === (params as ProfileParams)?.username)),
    );
  }

  async selectProfile(user: UserModel | undefined) {
    if (user) {
      await this.router.navigate(['profile', user.name]);
    }
  }
}
