import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { currentUserResolver } from './current-user-resolver';
import { UserModel } from '../../user/user-model';

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
