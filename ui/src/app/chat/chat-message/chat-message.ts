import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Avatar } from '../../shared/avatar/avatar';
import { MessageModel } from '../message-model';
import { UserModel } from '../../user/user-model';

@Component({
  selector: 'app-chat-message',
  imports: [Avatar, DatePipe],
  templateUrl: './chat-message.html',
  styleUrls: ['./chat-message.scss'],
})
export class ChatMessage {
  readonly message = input.required<MessageModel>();
  readonly current = input.required<UserModel | undefined>();
}
