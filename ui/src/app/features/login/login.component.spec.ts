import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginComponent } from './login.component';
import { ChatModule } from '../chat';
import { routes } from '../chat/chat-routing.module';
import { UserService } from 'src/app/services';
import { MockUserService } from 'src/app/components/user/user.component.spec';

describe(LoginComponent.name, () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ChatModule, RouterTestingModule.withRoutes(routes), LoginComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: MatSnackBar, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
