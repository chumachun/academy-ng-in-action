import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChatService, Message, User } from 'src/app/services';
import { ChatboardComponent } from './chatboard.component';

const user: User = { name: 'Andi' };

const mockMessages: Message[] = [
  {
    text: 'test1',
    sender: user.name,
    receiver: 'test2',
    date: new Date('2024-07-21'),
  },
  {
    text: 'test2',
    sender: 'test2',
    receiver: user.name,
    date: new Date('2024-07-20'),
  },
];

const mockReceivedMessages: Message[] = [
  {
    text: 'test3',
    sender: 'test3',
    receiver: user.name,
    date: new Date('2024-07-19'),
  },
];

export class MockChatService {
  openHub = () => {};
  closeHub = () => {};
  messages = (): Observable<Message[]> => of(mockMessages);
  receivedMessages: Message[] = mockReceivedMessages;
}

describe(ChatboardComponent.name, () => {
  let fixture: ComponentFixture<ChatboardComponent>;
  let component: ChatboardComponent;

  function getChatmessages() {
    return fixture.debugElement.queryAll(By.css('app-chatmessage'));
  }

  function getFirstChatmessage() {
    return fixture.debugElement.query(By.css('app-chatmessage'));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChatboardComponent],
      providers: [
        {
          provide: ChatService,
          useClass: MockChatService,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(ChatboardComponent);
    component = fixture.componentInstance;

    component.user = user;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should call ${ChatService.name} on init`, inject([ChatService], (chatService: ChatService) => {
    const spy = spyOn(chatService, 'messages').and.callThrough();

    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  }));

  it('should show one chat message component per message', () => {
    const result = getChatmessages().length;

    expect(result).toBe(mockMessages.length + mockReceivedMessages.length);
  });

  it('should sort chat messages by date and assign chat message to chat message component', () => {
    const result = getFirstChatmessage().properties['message'];

    expect(result).toEqual(mockReceivedMessages[0]);
  });

  it('should assign user to chat message component', () => {
    const result = getFirstChatmessage().properties['current'];

    expect(result).toEqual(user);
  });
});
