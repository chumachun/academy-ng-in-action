import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

import { Avatar } from '../../shared/avatar/avatar';
import { UserModel } from '../../user/user-model';
import { MessageModel } from '../message-model';

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
