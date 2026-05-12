import { Component, inject, input, model } from '@angular/core';
import { map, zip } from 'rxjs';
import { MatNavList, MatListItem } from '@angular/material/list';
import { AsyncPipe } from '@angular/common';
import { Avatar } from '../shared/avatar/avatar';
import { FilterUserPipe } from './filter-user-pipe';
import { UserModel } from '../user/user-model';
import { UserService } from '../user/user-service';

@Component({
  selector: 'app-list',
  imports: [MatNavList, MatListItem, Avatar, AsyncPipe, FilterUserPipe],
  templateUrl: './list.html',
  styleUrls: ['./list.scss'],
})
export class List {
  private readonly userService = inject(UserService);

  readonly user = input<UserModel>();
  readonly hideCurrentUser = input(false);
  readonly selected = model<UserModel>();

  readonly users$ = zip(this.userService.list(), this.userService.user$).pipe(
    map(([users, user]) =>
      this.hideCurrentUser() ? users.filter(u => u.name !== user?.name) : users,
    ),
  );

  toggleUser(user: UserModel) {
    this.selected.update(currentUser => (currentUser === user ? undefined : user));
  }
}
