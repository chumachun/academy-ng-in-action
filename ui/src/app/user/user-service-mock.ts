import { of } from 'rxjs';
import { vi } from 'vitest';
import { UserModel } from './user-model';

export const mockUser: UserModel = { name: 'TEST USER' };
export const mockUsers: UserModel[] = [mockUser, { name: 'TEST USER 2' }];

export class UserServiceMock {
  user = vi.fn(() => of(mockUser));
  list = vi.fn(() => of(mockUsers));
  set = vi.fn();
  unset = vi.fn();
  add = vi.fn(() => of(mockUser));
}
