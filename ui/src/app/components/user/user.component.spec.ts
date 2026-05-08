import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { UserComponent } from './user.component';
import { UserService } from 'src/app/services';
import { MOCK_USERS } from 'src/app/services/user/user.service.spec';

export class MockUserService {
  user = () => of(MOCK_USERS[0]);
  list = () => of(MOCK_USERS);
}

describe(UserComponent.name, () => {
  let fixture: ComponentFixture<UserComponent>;
  let component: UserComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [RouterTestingModule, UserComponent],
    providers: [
        { provide: UserService, useClass: MockUserService },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
      .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
