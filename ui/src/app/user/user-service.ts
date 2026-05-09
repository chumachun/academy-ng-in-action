import { Observable, BehaviorSubject, Subject, tap, map, switchMap, throwError } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel, UserDto, mapUser } from './user-model';
import { environment } from '../../environments/environment';

const USER_ENDPOINT = `${environment.endpoint}/users`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly user$: Subject<UserModel | undefined> = new BehaviorSubject<
    UserModel | undefined
  >(undefined);

  constructor() {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser && currentUser !== 'undefined') {
      this.set(mapUser(JSON.parse(currentUser)));
    }
  }

  set(user: UserModel | undefined) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.user$.next(user);
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

  // Exercise 4: Add update function here.

  list(): Observable<UserModel[]> {
    return this.http.get<UserDto[]>(USER_ENDPOINT).pipe(map(users => users.map(mapUser)));
  }

  user(): Observable<UserModel | undefined> {
    return this.user$.asObservable();
  }

  private userExists(user: UserModel): Observable<boolean> {
    return this.list().pipe(
      map(users => users.some(u => u.name.toUpperCase() === user.name.toUpperCase())),
    );
  }
}
