import { Component, OnInit, Input, inject } from '@angular/core';
import { ChatService, Message, User } from 'src/app/services';

import { ChatmessageComponent } from '../chatmessage/chatmessage.component';

@Component({
  selector: 'app-chat-board',
  templateUrl: './chatboard.component.html',
  styleUrls: ['./chatboard.component.scss'],
  imports: [ChatmessageComponent],
})
export class ChatboardComponent implements OnInit {
  private service = inject(ChatService);

  @Input() user: User | undefined;
  private messages: Message[] = [];

  ngOnInit() {
    this.service.messages(this.user).subscribe(m => (this.messages = m));
  }

  get sortedMessages() {
    return this.messages
      .concat(
        this.service.receivedMessages.filter(
          m => m.sender === this.user?.name || m.receiver === this.user?.name || (!m.receiver && m.sender !== this.user?.name),
        ),
      )
      .sort((a: Message, b: Message) => a.date.getTime() - b.date.getTime());
  }
}
