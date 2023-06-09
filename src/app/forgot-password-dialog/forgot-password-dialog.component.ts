import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-forgot-password-dialog",
  templateUrl: "./forgot-password-dialog.component.html",
  styleUrls: ["./forgot-password-dialog.component.css"]
})
export class ForgotPasswordDialogComponent {
  form = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
    ])
  });

  get email() {
    return this.form.get("email");
  }
}
