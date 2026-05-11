import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { ChatService, MessageModel } from '../chat';
import { UserModel, UserService } from '../user';

interface Item {
  id: string;
  value: string;
}

@Component({
  selector: 'app-main',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatButton, AsyncPipe],
  templateUrl: './main.html',
  styleUrls: ['./main.scss'],
})
export class Main {
  readonly userService = inject(UserService);
  readonly chatService = inject(ChatService);

  items$: Observable<Item[]> | undefined;

  listUsers() {
    this.items$ = this.userService.list().pipe(map(this.mapItems));
  }

  listMessages() {
    this.items$ = this.chatService.list().pipe(map(this.mapItems));
  }

  mapItems(items: UserModel[] | MessageModel[]): Item[] {
    return items.map(item => ({ id: item.id ?? '', value: JSON.stringify(item) }));
  }
}
