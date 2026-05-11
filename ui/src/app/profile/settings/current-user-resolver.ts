import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { first } from 'rxjs';
import { UserModel } from '../../user/user-model';
import { UserService } from '../../user/user-service';

export const currentUserResolver: ResolveFn<UserModel | undefined> = () => {
  const userService = inject(UserService);

  return userService.user$.pipe(first());
};
