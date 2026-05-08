import { Component, OnInit, Input, inject, output } from '@angular/core';
import { map, Observable, zip } from 'rxjs';
import { User, UserService } from 'src/app/services';
import { MatNavList, MatListItem } from '@angular/material/list';
import { AsyncPipe } from '@angular/common';
import { AvatarComponent } from '../../components/avatar/avatar.component';
import { FilterUserPipe } from 'src/app/pipes';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  imports: [MatNavList, MatListItem, AvatarComponent, AsyncPipe, FilterUserPipe],
})
export class ListComponent implements OnInit {
  private userService = inject(UserService);

  @Input() user: User | undefined;
  @Input() hideCurrentUser = false;
  @Input() selected?: User | null;
  readonly selectUser = output<User | undefined>();
  users$: Observable<User[]>;

  ngOnInit() {
    this.users$ = zip(this.userService.list(), this.userService.user()).pipe(
      map(([users, user]) => (this.hideCurrentUser ? users.filter(u => u.name !== user?.name) : users)),
    );
  }

  toggleUser(user: User) {
    let newUser: User | undefined = user;
    if (this.selected === user) {
      newUser = undefined;
    }

    this.selectUser.emit(newUser);
    this.selected = newUser;
  }
}
