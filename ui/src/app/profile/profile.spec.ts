import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MockUserService } from '../user/mock-user-service';
import { UserService } from '../user/user-service';
import { Profile } from './profile';

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
