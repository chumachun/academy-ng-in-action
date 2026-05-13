import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap, take, tap, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { userActions } from './state/user-actions';
import { selectUser } from './state/user-selectors';
import { mapUser, UserDto, UserModel } from './user-model';

const USER_ENDPOINT = `${environment.endpoint}/users`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly store = inject(Store);

  readonly user$ = this.store.select(selectUser);

  constructor() {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser && currentUser !== 'undefined') {
      this.set(mapUser(JSON.parse(currentUser)));
    }
  }

  set(user: UserModel | undefined) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.store.dispatch(userActions.set({ user }));
  }

  unset() {
    localStorage.clear();
    this.set(undefined);
  }

  add(user: UserModel): Observable<UserModel> {
    return this.userExists(user).pipe(
      switchMap(exists =>
        exists
          ? throwError(() => new Error(`User '${user.name}' already exists.`))
          : this.http.post<UserDto>(USER_ENDPOINT, user).pipe(
              tap(({ id }) => this.set({ ...user, id })),
              map(mapUser),
            ),
      ),
    );
  }

  update(user: UserModel): Observable<void> {
    return this.http.put<void>(USER_ENDPOINT, user).pipe(tap(() => this.set(user)));
  }

  list(): Observable<UserModel[]> {
    return this.http.get<UserDto[]>(USER_ENDPOINT).pipe(map(users => users.map(mapUser)));
  }

  private userExists(user: UserModel): Observable<boolean> {
    return this.list().pipe(
      take(1),
      map(users => users.some(u => u.name.toUpperCase() === user.name.toUpperCase())),
    );
  }
}
