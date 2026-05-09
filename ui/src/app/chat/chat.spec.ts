import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { UserService } from '../user';
import { ChatService } from './chat-service';
import { Chat } from './chat';
import { ChatServiceMock } from './chat-service-mock';
import { UserServiceMock } from '../user/user-service-mock';

describe(Chat.name, () => {
  let fixture: ComponentFixture<Chat>;
  let component: Chat;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [FormsModule, Chat],
      providers: [
        provideRouter([]),
        { provide: UserService, useClass: UserServiceMock },
        { provide: ChatService, useClass: ChatServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Chat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
