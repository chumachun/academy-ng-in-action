import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserModel, hairColors } from '../../user/user-model';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ProfileView } from '../profile-view';

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
