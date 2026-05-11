import { Component, inject, input } from '@angular/core';

import { ChatMessage } from '../chat-message/chat-message';
import { UserModel } from '../../user';
import { ChatService } from '../chat-service';
import { combineLatest, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-chat-board',
  imports: [AsyncPipe, ChatMessage],
  templateUrl: './chat-board.html',
  styleUrls: ['./chat-board.scss'],
})
export class ChatBoard {
  private readonly service = inject(ChatService);

  readonly user = input<UserModel>();

  private readonly history$ = this.service.messages(this.user());
  private readonly updates$ = this.service.receivedMessages$.pipe(
    map(messages =>
      messages.filter(message => {
        const user = this.user();
        return (
          message.sender === user?.name ||
          message.receiver === user?.name ||
          (!message.receiver && message.sender !== user?.name)
        );
      }),
    ),
  );

  readonly sortedMessages$ = combineLatest([this.history$, this.updates$]).pipe(
    map(([history, updates]) =>
      [...history, ...updates].sort((a, b) => a.date.getTime() - b.date.getTime()),
    ),
  );
}
