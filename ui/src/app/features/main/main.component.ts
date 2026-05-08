import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserService, ChatService, User, Message } from 'src/app/services';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';

interface Item {
  id: string;
  value: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatButton, NgIf, NgFor, AsyncPipe],
})
export class MainComponent {
  items$: Observable<Item[]>;

  constructor(
    readonly userService: UserService,
    readonly chatService: ChatService,
  ) {}

  listUsers() {
    this.items$ = this.userService.list().pipe(map(this.mapItems));
  }

  listMessages() {
    this.items$ = this.chatService.list().pipe(map(this.mapItems));
  }

  mapItems(items: User[] | Message[]): Item[] {
    return items.map(item => ({ id: item.id ?? '', value: JSON.stringify(item) }));
  }
}
