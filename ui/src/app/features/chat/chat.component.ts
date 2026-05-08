import { ChatService, Message, User, UserService } from 'src/app/services';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { ListComponent } from '../list/list.component';
import { ChatboardComponent } from '../../components/chatboard/chatboard.component';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ListComponent,
    ChatboardComponent,
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
  ],
})
export class ChatComponent implements OnInit, OnDestroy {
  private userService = inject(UserService);
  private chatService = inject(ChatService);

  text: string;
  message: Message;

  user?: User;
  subscription: Subscription;
  receiver?: User;

  async ngOnInit() {
    this.subscription = this.userService.user().subscribe(user => (this.user = user));

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
    this.chatService.add(message).subscribe();
  }

  private reset() {
    this.text = '';
  }
}
