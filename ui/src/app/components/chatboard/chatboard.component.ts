import { Component, OnInit, Input } from '@angular/core';
import { ChatService, Message, User } from 'src/app/services';

@Component({
  selector: 'app-chat-board',
  templateUrl: './chatboard.component.html',
  styleUrls: ['./chatboard.component.scss'],
  standalone: false,
})
export class ChatboardComponent implements OnInit {
  @Input() user: User | undefined;
  private messages: Message[] = [];

  constructor(private service: ChatService) { }

  ngOnInit() {
    this.service
      .messages(this.user)
      .subscribe(m => this.messages = m);
  }

  get sortedMessages() {
    return this.messages
      .concat(this.service.receivedMessages.filter(m => m.sender === this.user?.name
        || m.receiver === this.user?.name
        || (!m.receiver && m.sender !== this.user?.name)))
      .sort((a: Message, b: Message) => a.date.getTime() - b.date.getTime());
  }
}
