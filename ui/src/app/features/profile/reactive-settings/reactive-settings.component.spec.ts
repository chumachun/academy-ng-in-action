import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HairColors, UserService } from 'src/app/services';
import { ReactiveSettingsComponent } from '../reactive-settings';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

describe('ReactiveSettingsComponent', () => {
  let component: ReactiveSettingsComponent;
  let fixture: ComponentFixture<ReactiveSettingsComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let snackbarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['update']);
    snackbarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [ReactiveSettingsComponent],
      imports: [
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatOptionModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { data: of({ user: {} }) } },
        { provide: UserService, useValue: userServiceSpy },
        { provide: MatSnackBar, useValue: snackbarSpy },
      ],
    });

    fixture = TestBed.createComponent(ReactiveSettingsComponent);
    component = fixture.componentInstance;
  });

  it('should call userService.update with latest form data when save is called', fakeAsync(() => {
    const userData = {
      name: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      birthDate: new Date('1990-01-01'),
      hairColor: HairColors[1],
    };

    component.profileForm.setValue(userData);

    userServiceSpy.update.and.returnValue(of());
    component.save();

    expect(userServiceSpy.update).toHaveBeenCalledWith(userData);
  }));

  it('should display a success message when user was updated successfully', fakeAsync(() => {
    userServiceSpy.update.and.returnValue(of());

    const userData = {
      name: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      birthDate: new Date('1990-01-01'),
      hairColor: HairColors[1],
    };

    component.profileForm.setValue(userData);
    component.save();
    tick();

    expect(snackbarSpy.open).toHaveBeenCalledWith('User updated!', undefined, { duration: 5000 });
  }));

  it('should display an error message when user update fails', fakeAsync(() => {
    const errorMessage = 'Update failed';
    userServiceSpy.update.and.returnValue(new Observable(observer => observer.error(errorMessage)));

    const userData = {
      name: 'John Doe',
      firstName: 'John',
      lastName: 'Doe',
      birthDate: new Date('1990-01-01'),
      hairColor: HairColors[1],
    };

    component.profileForm.setValue(userData);
    component.save();
    tick();

    expect(snackbarSpy.open).toHaveBeenCalledWith(`Update failed: ${errorMessage}`, undefined, { duration: 5000 });
  }));

  afterEach(() => {
    fixture.destroy();
  });
});
