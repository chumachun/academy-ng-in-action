import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { catchError, EMPTY, first, map, Observable, tap } from 'rxjs';

import { hairColors, UserModel } from '../../user/user-model';
import { UserService } from '../../user/user-service';

@Component({
  selector: 'app-settings',
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
    FormsModule,
  ],
  templateUrl: './settings.html',
})
export class Settings {
  private readonly route = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly snackbar = inject(MatSnackBar);

  readonly availableHairColors = hairColors;
  readonly currentProfile$: Observable<UserModel> = this.route.data.pipe(
    map(data => data['user']),
    map(u => ({ ...u })),
  );

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
