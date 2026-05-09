import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../user';

const filterUser =
  ({ name: testUserName }: UserModel) =>
  ({ name }: UserModel) =>
    name.localeCompare(testUserName);

@Pipe({ name: 'filterUser' })
export class FilterUserPipe implements PipeTransform {
  transform(users: UserModel[], args?: UserModel): UserModel[] | null {
    return args ? users.filter(filterUser(args)) : users;
  }
}
