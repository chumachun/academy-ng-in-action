import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { App } from './app';
import { MockUserService } from './user/mock-user-service';
import { UserService } from './user/user-service';

describe(App.name, () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), { provide: UserService, useClass: MockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
