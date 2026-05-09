import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { UserService } from './user';
import { UserServiceMock } from './user/user-service-mock';

describe(App.name, () => {
  let fixture: ComponentFixture<App>;
  let component: App;
  let service: UserService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), { provide: UserService, useClass: UserServiceMock }],
    }).compileComponents();

    service = TestBed.inject(UserService);

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it(`should call ${UserService.name}.user() on creation`, () => {
    expect(service.user).toHaveBeenCalled();
  });
});
