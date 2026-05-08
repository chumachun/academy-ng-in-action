import { ChatService, Message, User, UserService } from 'src/app/services';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  standalone: false,
})
export class ChatComponent implements OnInit, OnDestroy {
  text: string;
  message: Message;

  user?: User;
  subscription: Subscription;
  receiver?: User;

  constructor(private userService: UserService, private chatService: ChatService) { }

  async ngOnInit() {
    this.subscription = this.userService
      .user()
      .subscribe(user => this.user = user);

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

  selectReceiver(user: User | undefined) {
    this.receiver = user;
  }

  private sendMessage(message: Message) {
    this.chatService
      .add(message)
      .subscribe();
  }

  private reset() {
    this.text = '';
  }
}
