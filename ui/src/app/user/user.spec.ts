import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MockUserService } from './mock-user-service';
import { User } from './user';
import { UserService } from './user-service';

describe(User.name, () => {
  let fixture: ComponentFixture<User>;
  let component: User;

  beforeEach(async () => {
    // We need to await for lazy/deferred chunks to be loaded.
    await TestBed.configureTestingModule({
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
