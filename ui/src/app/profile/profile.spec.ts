import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Profile } from './profile';
import { MockUserService } from '../user/mock-user-service';
import { UserService } from '../user/user-service';

describe(Profile.name, () => {
  let fixture: ComponentFixture<Profile>;
  let component: Profile;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [Profile],
      providers: [provideRouter([]), { provide: UserService, useClass: MockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
