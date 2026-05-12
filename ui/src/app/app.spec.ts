import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { UserService } from './user/user-service';
import { MockUserService } from './user/mock-user-service';

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
