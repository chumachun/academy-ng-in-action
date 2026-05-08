import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserService } from './services';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { NgIf, AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UserComponent } from './components/user/user.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatToolbar, NgIf, MatToolbarRow, MatButton, RouterLink, RouterLinkActive, UserComponent, RouterOutlet, AsyncPipe],
})
export class AppComponent implements OnInit {
  user$: Observable<User | undefined>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user$ = this.userService.user();
  }
}
