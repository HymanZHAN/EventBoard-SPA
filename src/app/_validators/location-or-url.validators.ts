import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const locationOrUrlValidator: ValidatorFn = (
  formGroup: FormGroup
): ValidationErrors | null => {
  const location = formGroup.get('location');
  const address = location.get('address');
  const city = location.get('city');
  const country = location.get('country');
  const url = formGroup.get('url');

  if (
    (address &&
      address.value &&
      city &&
      city.value &&
      country &&
      country.value) ||
    (url && url.value)
  ) {
    return null;
  } else {
    return { invalid: true, locationOrUrl: true };
  }
};
