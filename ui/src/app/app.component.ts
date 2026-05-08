import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  user$: Observable<User | undefined>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user$ = this.userService.user();
  }
}
