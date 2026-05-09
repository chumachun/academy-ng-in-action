import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Main } from './main';
import { UserService } from '../user';
import { ChatService } from '../chat';

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
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
