import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs/esm';

@Pipe({
  name: 'age',
})
export class AgePipe implements PipeTransform {
  transform(value: Date | undefined): unknown {
    const date = dayjs(value);
    if (!value || !date.isValid()) {
      return '';
    }

    return dayjs().diff(date, 'y').toString();
  }
}
