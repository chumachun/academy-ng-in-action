import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { first, map } from 'rxjs/operators';
import { UserService } from '../user';

export const hasUserGuard: CanActivateFn = () => {
  const userService = inject(UserService);

  return userService.user().pipe(
    first(),
    map(user => !!user),
  );
};
