import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameValidator',
  standalone: true
})
export class NameValidatorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
