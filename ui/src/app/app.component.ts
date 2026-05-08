import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserService } from './services';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserComponent } from './components/user/user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatToolbar, MatToolbarRow, MatButton, RouterLink, RouterLinkActive, UserComponent, RouterOutlet, AsyncPipe],
})
export class AppComponent implements OnInit {
  private userService = inject(UserService);

  user$: Observable<User | undefined>;

  ngOnInit(): void {
    this.user$ = this.userService.user();
  }
}
