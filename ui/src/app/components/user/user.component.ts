import { Observable } from 'rxjs';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User, UserService } from 'src/app/services';
import { AsyncPipe } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [RouterLink, AvatarComponent, AsyncPipe],
})
export class UserComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  user$: Observable<User | undefined>;

  constructor() {
    this.user$ = this.userService.user();
  }

  async logout(): Promise<void> {
    this.userService.unset();
    await this.navigate();
  }

  private async navigate(): Promise<void> {
    await this.router.navigate(['/login']);
  }
}
