import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Avatar } from '../../shared/avatar';
import { MessageModel } from '../message-model';
import { UserModel } from '../../user';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.html',
  styleUrls: ['./chat-message.scss'],
  imports: [Avatar, DatePipe],
})
export class ChatMessage {
  readonly message = input.required<MessageModel>();
  readonly current = input<UserModel>();
}
