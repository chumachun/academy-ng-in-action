import { createActionGroup, props } from '@ngrx/store';

import { UserModel } from '../user-model';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    Set: props<{ user: UserModel | undefined }>(),
  },
});
