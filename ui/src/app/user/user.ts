import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Avatar } from '../shared/avatar';
import { UserService } from './user-service';

@Component({
  selector: 'app-user',
  imports: [RouterLink, Avatar, AsyncPipe],
  templateUrl: './user.html',
  styleUrls: ['./user.scss'],
})
export class User {
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  readonly user$ = this.userService.user$;

  async logout(): Promise<void> {
    this.userService.unset();
    await this.navigate();
  }

  private async navigate(): Promise<void> {
    await this.router.navigate(['/login']);
  }
}
