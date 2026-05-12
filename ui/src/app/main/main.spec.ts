import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Main } from './main';
import { UserService } from '../user/user-service';
import { ChatService } from '../chat/chat-service';

describe(Main.name, () => {
  let fixture: ComponentFixture<Main>;
  let component: Main;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Main],
      providers: [
        { provide: ChatService, useValue: {} },
        { provide: UserService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Main);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
