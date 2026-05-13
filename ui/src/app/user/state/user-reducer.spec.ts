import { TestBed } from '@angular/core/testing';
import { initialState, userReducer } from './user-reducer';
import { userActions } from './user-actions';
import { UserModel } from '../user-model';

describe(userReducer.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should return the initial state', () => {
    const action = { type: 'NOOP' };
    const result = userReducer(undefined, action);
    expect(result).toBe(initialState);
  });

  it('should set user on setUser', () => {
    const user: UserModel = {
      name: 'Max',
    };
    const action = userActions.set({ user });
    const result = userReducer(initialState, action);

    expect(result).toEqual({
      user: user,
    });
  });
});
