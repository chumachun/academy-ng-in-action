import { TestBed } from '@angular/core/testing';

import { UserModel } from '../user-model';
import { UserState } from './user-reducer';
import { selectUser } from './user-selectors';

interface AppState {
  user: UserState;
}

describe('user selectors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  describe(selectUser.name, () => {
    it('should be created', () => {
      expect(selectUser).toBeTruthy();
    });

    it('should return the user from the state', () => {
      const user: UserModel = {
        name: 'Max',
      };
      const appState: AppState = {
        user: {
          user,
        },
      };

      const result = selectUser(appState);
      expect(result).toEqual(user);
    });
  });
});
