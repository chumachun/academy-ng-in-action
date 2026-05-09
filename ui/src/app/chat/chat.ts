import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { List } from '../list/list';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ChatBoard } from './chat-board';
import { ChatService } from './chat-service';
import { UserModel, UserService } from '../user';
import { MessageModel } from './message-model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
  imports: [
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
  message?: MessageModel;

  user?: UserModel;
  subscription = this.userService.user().subscribe(user => (this.user = user));
  receiver?: UserModel;

  async ngOnInit() {
    await this.chatService.openHub();
  }

  async ngOnDestroy() {
    this.subscription.unsubscribe();

    await this.chatService.closeHub();
  }

  send() {
    this.message = {
      text: this.text,
      sender: this.user?.name ?? '',
      receiver: this.receiver?.name,
      date: new Date(),
    };

    this.reset();
    this.sendMessage(this.message);
  }

  selectReceiver(user: UserModel | undefined) {
    this.receiver = user;
  }

  private sendMessage(message: MessageModel) {
    this.chatService.add(message).subscribe();
  }

  private reset() {
    this.text = '';
  }
}
