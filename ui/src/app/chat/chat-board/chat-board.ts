import { Component, OnInit, inject, input } from '@angular/core';

import { ChatMessage } from '../chat-message/chat-message';
import { UserModel } from '../../user';
import { MessageModel } from '../message-model';
import { ChatService } from '../chat-service';

@Component({
  selector: 'app-chat-board',
  templateUrl: './chat-board.html',
  styleUrls: ['./chat-board.scss'],
  imports: [ChatMessage],
})
export class ChatBoard implements OnInit {
  private readonly service = inject(ChatService);

  readonly user = input<UserModel>();
  private messages: MessageModel[] = [];

  ngOnInit() {
    this.service.messages(this.user()).subscribe(m => (this.messages = m));
  }

  get sortedMessages() {
    return this.messages
      .concat(
        this.service.receivedMessages.filter(m => {
          const user = this.user();
          return (
            m.sender === user?.name ||
            m.receiver === user?.name ||
            (!m.receiver && m.sender !== user?.name)
          );
        }),
      )
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }
}
