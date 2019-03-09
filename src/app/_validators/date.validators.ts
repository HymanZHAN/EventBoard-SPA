import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export const dateValidator: ValidatorFn = (
  dateControl: AbstractControl
): ValidationErrors | null => {
  const date: moment.Moment = moment(dateControl.value, 'MM/DD/YYYY', true);

  console.log(date);
  console.log(date.isValid());

  if (date && date.isValid()) {
    return null;
  } else {
    return { invalid: true, invalidDate: true };
  }
};
