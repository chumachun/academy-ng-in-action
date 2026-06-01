import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom, isObservable } from 'rxjs';

import { mockUserSubject$ } from '../user/mock-user-service';
import { UserService } from '../user/user-service';
import { hasUserGuard } from './has-user-guard';

describe(hasUserGuard.name, () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => hasUserGuard(...guardParameters));

  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

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

    mockRoute = TestBed.inject(ActivatedRouteSnapshot);
    mockState = TestBed.inject(RouterStateSnapshot);
  });

  it('should be called and allow navigation if user is present', async () => {
    mockUserSubject$.next({ name: 'asdf' });

    const result = executeGuard(mockRoute, mockState);

    if (!isObservable(result)) {
      assert.fail('Guard did not return an Observable');
    }

    expect(await firstValueFrom(result)).toBeTruthy();
  });

  it('should be called and not allow navigation if user is not present', async () => {
    mockUserSubject$.next(undefined);

    const result = executeGuard(mockRoute, mockState);

    if (!isObservable(result)) {
      assert.fail('Guard did not return an Observable');
    }

    expect(await firstValueFrom(result)).toBeFalsy();
  });
});
