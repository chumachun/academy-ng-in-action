import { AsyncPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatInput } from '@angular/material/input';
import { MatFormField } from '@angular/material/select';
import { first } from 'rxjs';

import { List } from '../list/list';
import { UserModel } from '../user/user-model';
import { UserService } from '../user/user-service';
import { ChatBoard } from './chat-board/chat-board';
import { ChatService } from './chat-service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
  imports: [
    AsyncPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    List,
    ChatBoard,
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
  ],
})
export class Chat implements OnInit, OnDestroy {
  private readonly userService = inject(UserService);
  private readonly chatService = inject(ChatService);

  text = '';

  readonly user$ = this.userService.user$;
  private receiver?: UserModel;

  async ngOnInit() {
    await this.chatService.openHub();
  }

  async ngOnDestroy() {
    await this.chatService.closeHub();
  }

  send(user: UserModel) {
    this.text = '';

    this.chatService
      .add({
        text: this.text,
        sender: user?.name ?? '',
        receiver: this.receiver?.name,
        date: new Date(),
      })
      .pipe(first())
      .subscribe();
  }

  selectReceiver(user: UserModel | undefined) {
    this.receiver = user;
  }
}
