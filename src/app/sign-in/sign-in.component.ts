import { RegistrationService } from './../Services/registration.service';
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ForgotPasswordDialogComponent } from "../forgot-password-dialog/forgot-password-dialog.component";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.css"]
})
export class SignInComponent implements OnInit{
  hide = true;
  authError: any;
  form = new FormGroup({
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    ])
  });

  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }

  constructor(public dialog: MatDialog,
    private reg:RegistrationService) {}

    ngOnInit() {
      this.reg.eventAuthError$.subscribe(data => {
        this.authError = data;
      });
    }

  Login(){
    console.log(this.form.get("email").value);
     this.reg.LoginWithEmail(this.form.get("email").value,this.form.get("password").value);
  }
  GoogleLogin(){
    this.reg.LoginWithGoogle();
  }
  openDialog() {
    this.dialog.open(ForgotPasswordDialogComponent);
  }
}
