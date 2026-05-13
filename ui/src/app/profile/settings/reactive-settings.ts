import { AsyncPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatOption,
  MatSelect,
  MatSuffix,
} from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, first, map, startWith, tap } from 'rxjs';

import { HairColor, hairColors, UserModel } from '../../user/user-model';
import { UserService } from '../../user/user-service';
import { AgePipe } from '../profile-view/age-pipe';

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
  providers: [AgePipe],
  templateUrl: './reactive-settings.html',
})
export class ReactiveSettings {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly snackbar = inject(MatSnackBar);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly agePipe = inject(AgePipe);

  readonly availableHairColors = hairColors;
  readonly currentProfile$ = this.route.data.pipe(
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

  private readonly birthDate = toSignal(
    this.profileForm.controls.birthDate.valueChanges.pipe(
      startWith(this.profileForm.controls.birthDate.value),
    ),
    { initialValue: null },
  );

  readonly age = computed(() => {
    const birthDate = this.birthDate();
    return birthDate ? this.agePipe.transform(birthDate) : 'Unknown';
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
