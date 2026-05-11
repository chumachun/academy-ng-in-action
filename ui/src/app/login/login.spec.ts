import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideRouter } from '@angular/router';
import { Login } from './login';
import { UserServiceMock } from '../user/user-service-mock';
import { UserService } from '../user';

describe(Login.name, () => {
  let fixture: ComponentFixture<Login>;
  let component: Login;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [FormsModule, Login],
      providers: [
        provideRouter([{ path: 'chat', component: class {} }]),
        { provide: UserService, useClass: UserServiceMock },
        { provide: MatSnackBar, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
