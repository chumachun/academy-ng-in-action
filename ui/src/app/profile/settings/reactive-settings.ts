import { Component, inject } from '@angular/core';
import { catchError, EMPTY, first, map, Observable, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import {
  MatFormField,
  MatLabel,
  MatError,
  MatOption,
  MatSelect,
  MatSuffix,
} from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatDatepickerInput,
  MatDatepickerToggle,
  MatDatepicker,
} from '@angular/material/datepicker';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { HairColor, hairColors, UserModel } from '../../user/user-model';
import { UserService } from '../../user/user-service';

@Component({
  selector: 'app-reactive-settings',
  imports: [
    AsyncPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatButton,
    MatLabel,
    MatInput,
    MatError,
    MatOption,
    MatSelect,
    MatSuffix,
    MatDatepicker,
    MatDatepickerToggle,
    MatDatepickerInput,
    ReactiveFormsModule,
  ],
  templateUrl: './reactive-settings.html',
})
export class ReactiveSettings {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly snackbar = inject(MatSnackBar);
  private readonly formBuilder = inject(NonNullableFormBuilder);

  readonly availableHairColors = hairColors;
  readonly currentProfile$: Observable<UserModel> = this.route.data.pipe(
    map(data => data['user']),
    map(u => ({ ...u })),
    tap(user => this.profileForm.patchValue(user)),
  );

  readonly profileForm = this.formBuilder.group({
    name: new FormControl<string>('', [Validators.required]),
    firstName: new FormControl<string | null>(null),
    lastName: new FormControl<string | null>(null),
    birthDate: new FormControl<Date | null>(null),
    hairColor: new FormControl<HairColor>(hairColors[0]),
  });

  save(updatedProfile: UserModel): void {
    this.userService
      .update(updatedProfile)
      .pipe(
        first(),
        tap(() => this.snackbar.open('User updated!', undefined, { duration: 5000 })),
        catchError(error => {
          this.snackbar.open(`Update failed: ${error}`, undefined, { duration: 5000 });
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
