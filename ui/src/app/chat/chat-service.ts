import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';
import { environment } from '../../environments/environment';
import { MessageModel, MessageDto, mapMessage, mapMessages } from './message-model';
import { UserModel } from '../user';

const MESSAGES_ENDPOINT = `${environment.endpoint}/messages`;
const CHAT_HUB_ENDPOINT = `${environment.endpoint}/chatHub`;

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly http = inject(HttpClient);

  private readonly receivedMessagesSubject$ = new BehaviorSubject<MessageModel[]>([]);
  readonly receivedMessages$ = this.receivedMessagesSubject$.asObservable();

  private readonly connection = new HubConnectionBuilder()
    .withUrl(CHAT_HUB_ENDPOINT, {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    })
    .build();

  constructor() {
    this.connection.on('messageReceived', (message: MessageDto) =>
      this.receivedMessagesSubject$.next([
        ...this.receivedMessagesSubject$.value,
        mapMessage(message),
      ]),
    );
  }

  async openHub() {
    await this.connection.start().catch(error => console.error(error));
  }

  async closeHub() {
    await this.connection.stop();
    this.receivedMessagesSubject$.next([]);
  }

  messages(user: UserModel | undefined): Observable<MessageModel[]> {
    return this.http
      .get<MessageDto[]>(`${MESSAGES_ENDPOINT}/user/${user?.name}`)
      .pipe(map(mapMessages));
  }

  list(): Observable<MessageModel[]> {
    return this.http.get<MessageDto[]>(MESSAGES_ENDPOINT).pipe(map(mapMessages));
  }

  add(message: MessageModel): Observable<MessageModel> {
    this.connection.send('sendMessage', message).catch(error => console.error(error));

    return this.http.post<MessageDto>(MESSAGES_ENDPOINT, message).pipe(
      tap(({ id }) => console.debug('ChatService.add', { ...message, id })),
      map(mapMessage),
    );
  }
}
