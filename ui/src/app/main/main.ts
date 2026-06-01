import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { map, Observable } from 'rxjs';

import { ChatService } from '../chat/chat-service';
import { MessageModel } from '../chat/message-model';
import { UserModel } from '../user/user-model';
import { UserService } from '../user/user-service';

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
