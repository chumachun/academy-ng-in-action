import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../services';

const filterUser = ({ name: testUserName }: User) => ({ name }: User) => name.localeCompare(testUserName);

@Pipe({
  name: 'filterUser',
  standalone: false,
})
export class FilterUserPipe implements PipeTransform {
  transform(users: User[], args?: User): User[] | null {
    return args ? users.filter(filterUser(args)) : users;
  }
}
