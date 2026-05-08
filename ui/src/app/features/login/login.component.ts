import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { User, UserService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  name: string | null;

  constructor(
    private router: Router,
    private user: UserService,
    private snackBar: MatSnackBar,
  ) {
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
    const user: User = { name: this.name ?? '' };

    this.user
      .add(user)
      .subscribe({
        complete: async () => await this.navigate(),
        error: error => {
          console.log(error);
          this.showError(`User could not be added: ${error}`);
          this.name = null;
        },
      });
  }

  async login(user: User | undefined) {
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
