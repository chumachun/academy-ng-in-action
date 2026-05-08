import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService } from 'src/app/services';
import { ProfileParams } from './profile-routing.module';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: false,
})
export class ProfileComponent implements OnInit {
  currentProfile$: Observable<User | undefined>;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.currentProfile$ = from(this.userService.list())
      .pipe(switchMap(list => this.getCurrentFromList(list)));
  }

  private getCurrentFromList(list: User[]) {
    return this.route.params.pipe(
      map(params => list.find(u => u.name === (params as ProfileParams)?.username)),
    );
  }

  async selectProfile(user: User | undefined) {
    await this.router.navigate(['profile', user?.name]);
  }
}
