import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MockUserService } from 'src/app/components/user/user.component.spec';
import { MockChatService } from 'src/app/components/chatboard/chatboard.component.spec';
import { ChatService, UserService } from 'src/app/services';
import { ChatComponent } from './chat.component';

describe(ChatComponent.name, () => {
  let fixture: ComponentFixture<ChatComponent>;
  let component: ChatComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ChatComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: ChatService, useClass: MockChatService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
