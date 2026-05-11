import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { UserModel } from '../../user/user-model';
import { currentUserResolver } from './current-user-resolver';

describe(currentUserResolver.name, () => {
  const executeResolver: ResolveFn<UserModel | undefined> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => currentUserResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
