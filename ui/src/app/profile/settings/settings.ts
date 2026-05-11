import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

import { hairColors, UserModel } from '../../user/user-model';
import { ProfileView } from '../profile-view/profile-view';

@Component({
  selector: 'app-settings',
  imports: [AsyncPipe, ProfileView],
  templateUrl: './settings.html',
})
export class Settings {
  private readonly route = inject(ActivatedRoute);

  readonly availableHairColors = hairColors;
  readonly currentProfile$: Observable<UserModel> = this.route.data.pipe(
    map(data => data['user']),
    map(u => ({ ...u })),
  );
}
