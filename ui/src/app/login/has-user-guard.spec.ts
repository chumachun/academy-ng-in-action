import { TestBed } from '@angular/core/testing';
import { hasUserGuard } from './has-user-guard';
import { isObservable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user-service';
import { mockUserSubject$ } from '../user/mock-user-service';

describe(hasUserGuard.name, () => {
  let routeMock: ActivatedRouteSnapshot;
  let stateMock: RouterStateSnapshot;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: { user$: mockUserSubject$.asObservable() },
        },
        { provide: ActivatedRouteSnapshot, useValue: {} },
        { provide: RouterStateSnapshot, useValue: {} },
      ],
    });

    routeMock = TestBed.inject(ActivatedRouteSnapshot);
    stateMock = TestBed.inject(RouterStateSnapshot);
  });

  it('should be called and allow navigation if user is present', async () => {
    mockUserSubject$.next({ name: 'asdf' });

    const result = await TestBed.runInInjectionContext(() => hasUserGuard(routeMock, stateMock));

    if (!isObservable(result)) {
      assert.fail('Guard did not return an Observable');
    }

    result.subscribe(value => {
      expect(value).toBeTruthy();
    });
  });

  it('should be called and not allow navigation if user is not present', async () => {
    mockUserSubject$.next(undefined);

    const result = await TestBed.runInInjectionContext(() => hasUserGuard(routeMock, stateMock));

    if (!isObservable(result)) {
      assert.fail('Guard did not return an Observable');
    }

    result.subscribe(value => {
      expect(value).toBeFalsy();
    });
  });
});
