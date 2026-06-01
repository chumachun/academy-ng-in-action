import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';

import { MockUserService } from '../user/mock-user-service';
import { UserService } from '../user/user-service';
import { Chat } from './chat';
import { ChatService } from './chat-service';
import { MockChatService } from './mock-chat-service';

describe(Chat.name, () => {
  let fixture: ComponentFixture<Chat>;
  let component: Chat;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [FormsModule, Chat],
      providers: [
        provideRouter([]),
        { provide: UserService, useClass: MockUserService },
        { provide: ChatService, useClass: MockChatService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Chat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
