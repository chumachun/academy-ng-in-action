import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/select';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { List } from '../list/list';
import { UserModel, UserService } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    FormsModule,
    MatFormField,
    MatInput,
    MatButton,
    List,
  ],
})
export class Login {
  private readonly router = inject(Router);
  private readonly user = inject(UserService);
  private readonly snackBar = inject(MatSnackBar);

  name: string | null = null;

  constructor() {
    this.user
      .user()
      .pipe(first())
      .subscribe(async currentUser => {
        if (currentUser) {
          await this.navigate();
        }
      });
  }

  register() {
    const user: UserModel = { name: this.name ?? '' };

    this.user.add(user).subscribe({
      complete: async () => await this.navigate(),
      error: error => {
        console.log(error);
        this.showError(`User could not be added: ${error}`);
        this.name = null;
      },
    });
  }

  async login(user: UserModel | undefined) {
    this.user.set(user);
    await this.navigate();
  }

  showError(error: string) {
    this.snackBar.open(error, undefined, { duration: 5000 });
  }

  private async navigate() {
    await this.router.navigate(['/chat']);
  }
}
