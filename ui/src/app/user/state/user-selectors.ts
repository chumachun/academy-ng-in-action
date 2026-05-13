import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user-reducer';

const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(selectUserState, ({ user }) => user);
