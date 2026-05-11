import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { first } from 'rxjs';
import { ChatBoard } from './chat-board';
import { ChatService } from './chat-service';
import { UserModel, UserService } from '../user';
import { List } from '../list/list';
import { AsyncPipe } from '@angular/common';

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
