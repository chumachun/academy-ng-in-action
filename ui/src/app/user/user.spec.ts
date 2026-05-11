import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { User } from './user';
import { UserService } from './user-service';
import { MockUserService } from './mock-user-service';

describe(User.name, () => {
  let fixture: ComponentFixture<User>;
  let component: User;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [User],
      providers: [provideRouter([]), { provide: UserService, useClass: MockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(User);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
