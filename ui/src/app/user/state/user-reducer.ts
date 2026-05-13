import { Action, createReducer, on } from '@ngrx/store';
import { UserModel } from '../user-model';
import { userActions } from './user-actions';

export interface UserState {
  user: UserModel | undefined;
}

export const initialState: UserState = {
  user: undefined,
};

export const userReducer = createReducer<UserState, Action>(
  initialState,
  on(userActions.set, (state, { user }): UserState => ({ ...state, user })),
);
