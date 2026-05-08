import { Observable, BehaviorSubject, Subject, tap, map, switchMap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User, UserDto, mapUser } from './user';

const USER_ENDPOINT = `${environment.endpoint}/users`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$: Subject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);

  constructor(private readonly http: HttpClient) {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser && currentUser !== 'undefined') {
      this.set(mapUser(JSON.parse(currentUser)));
    }
  }

  set(user: User | undefined) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.user$.next(user);
  }

  unset() {
    localStorage.clear();
    this.set(undefined);
  }

  add(user: User): Observable<User> {
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

  list(): Observable<User[]> {
    return this.http.get<UserDto[]>(USER_ENDPOINT).pipe(map(users => users.map(mapUser)));
  }

  user(): Observable<User | undefined> {
    return this.user$.asObservable();
  }

  private userExists(user: User): Observable<boolean> {
    return this.list().pipe(map(users => users.some(u => u.name.toUpperCase() === user.name.toUpperCase())));
  }
}
