import { AbstractControl, ValidationErrors } from "@angular/forms";

export class formValidators {
  static cannontContainSpace(control: AbstractControl | null) {
    if ((control.value as string).indexOf(" ") >= 0)
      return { cannontContainSpace: true };

    return null;
  }
}
