import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Profile } from './profile';
import { UserService } from '../user';
import { UserServiceMock } from '../user/user-service-mock';

describe(Profile.name, () => {
  let fixture: ComponentFixture<Profile>;
  let component: Profile;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Profile],
      providers: [provideRouter([]), { provide: UserService, useClass: UserServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
