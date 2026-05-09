import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { User } from './user';
import { UserServiceMock as MockUserService } from './user-service-mock';
import { UserService } from './user-service';

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
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
