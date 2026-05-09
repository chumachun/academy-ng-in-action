import { TestBed } from '@angular/core/testing';
import { hasUserGuard } from './has-user-guard';
import { isObservable, Subject } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserModel, UserService } from '../user';

describe(hasUserGuard.name, () => {
  let userSubject: Subject<UserModel | null>;
  let routeMock: ActivatedRouteSnapshot;
  let stateMock: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            user() {
              return userSubject;
            },
          },
        },
        { provide: ActivatedRouteSnapshot, useValue: {} },
        { provide: RouterStateSnapshot, useValue: {} },
      ],
    });

    userSubject = new Subject<UserModel | null>();
    routeMock = TestBed.inject(ActivatedRouteSnapshot);
    stateMock = TestBed.inject(RouterStateSnapshot);
  });

  it('should be called and allow navigation if user is present', () => {
    let called = false;

    TestBed.runInInjectionContext(() => {
      const result = hasUserGuard(routeMock, stateMock);
      if (!isObservable(result)) {
        assert.fail('Guard did not return an Observable');
      }

      result.subscribe(value => {
        expect(value).toBeTruthy();
        called = true;
      });
    });

    userSubject.next({ name: 'asdf' });

    expect(called).toBeTruthy();
  });

  it('should be called and not allow navigation if user is not present', () => {
    let called = false;

    TestBed.runInInjectionContext(() => {
      const result = hasUserGuard(routeMock, stateMock);
      if (!isObservable(result)) {
        assert.fail('Guard did not return an Observable');
      }

      result.subscribe(value => {
        expect(value).toBeFalsy();
        called = true;
      });
    });

    userSubject.next(null);

    expect(called).toBeTruthy();
  });
});
