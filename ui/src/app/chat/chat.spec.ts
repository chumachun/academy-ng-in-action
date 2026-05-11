import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { UserService } from '../user';
import { ChatService } from './chat-service';
import { Chat } from './chat';
import { MockChatService } from './mock-chat-service';
import { MockUserService } from '../user/mock-user-service';

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
