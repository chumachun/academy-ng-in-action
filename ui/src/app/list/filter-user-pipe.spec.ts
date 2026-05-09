import { FilterUserPipe } from './filter-user-pipe';
import { UserModel } from '../user';
import { mockUsers } from '../user/user-service-mock';

describe(FilterUserPipe.name, () => {
  const pipe = new FilterUserPipe();

  it('should create ann instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return unfiltered users if no user was provided', () => {
    const result = pipe.transform(mockUsers);

    expect(result).toBe(mockUsers);
  });

  it('should return filtered users if user was provided', () => {
    const user: UserModel = { name: 'findMe' };

    const result = pipe.transform([...mockUsers, user], user);

    expect(result).toEqual(mockUsers);
  });
});
