import { BehaviorSubject, of } from 'rxjs';
import { vi } from 'vitest';
import { UserModel } from './user-model';

export const mockUser: UserModel = { name: 'TEST USER' };
export const mockUsers: UserModel[] = [mockUser, { name: 'TEST USER 2' }];
export const mockUserSubject$ = new BehaviorSubject<UserModel | undefined>(mockUser);
export class MockUserService {
  user$ = mockUserSubject$.asObservable();
  list = vi.fn(() => of(mockUsers));
  set = vi.fn(user => mockUserSubject$.next(user));
  unset = vi.fn(() => mockUserSubject$.next(undefined));
  add = vi.fn(user => of(user));
}
