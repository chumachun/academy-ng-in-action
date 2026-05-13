import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatBoard } from './chat-board';

import { MockChatService, mockMessages, mockReceivedMessages } from '../mock-chat-service';
import { ChatService } from '../chat-service';
import { mockUser } from '../../user/mock-user-service';

describe(ChatBoard.name, () => {
  let fixture: ComponentFixture<ChatBoard>;
  let component: ChatBoard;

  function getChatMessages() {
    return fixture.debugElement.queryAll(By.css('app-chat-message'));
  }

  function getFirstChatMessage() {
    return fixture.debugElement.query(By.css('app-chat-message'));
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ChatBoard],
      providers: [
        {
          provide: ChatService,
          useClass: MockChatService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatBoard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('user', mockUser);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show one chat message component per message', () => {
    const result = getChatMessages().length;

    expect(result).toBe(mockMessages.length + mockReceivedMessages.length);
  });

  it('should sort chat messages by date and assign chat message to chat message component', () => {
    const result = getFirstChatMessage().componentInstance.message();

    expect(result).toEqual(mockReceivedMessages[0]);
  });

  it('should assign user to chat message component', () => {
    const result = getFirstChatMessage().componentInstance.current();

    expect(result).toEqual(mockUser);
  });
});
