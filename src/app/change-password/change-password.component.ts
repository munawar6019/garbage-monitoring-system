import { formatDate } from '@angular/common';
import { FormControl } from '@angular/forms';
import { UserService } from './../Services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MyErrorStateMatcher } from './../forgot-password/forgot-password.component';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'; 
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  matcher = new MyErrorStateMatcher();
  timeNow = new Date();
  myForm = new FormGroup({
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
      )
    ]),
    confirmPassword : new FormControl(""),
    UpdatedAt: new  FormControl(""),
  });
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {
      this.myForm.patchValue({
        UpdatedAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US')
      })
   }

  ngOnInit(): void {
  }
  get password() {
    return this.myForm.get("password");
  }
  onCloseDialog(){
    this.dialogRef.close();
  }
  changePassword(){
    console.log(this.myForm.value);
    console.log();
    let pass = this.myForm.get("password").value;
    let confirmPass = this.myForm.get("confirmPassword").value;
    if(pass == confirmPass){
      firebase.auth().onAuthStateChanged(user =>{
      this.userService.ChangePassword(user.uid,pass);
      this._snackBar.open('Your Password Submitted Successfully!','Password Changed!',{
        duration: 2000
      });
      this.onCloseDialog();
      })
    }else{
      this._snackBar.open('Your Password Doesnot Match!','Password Not Changed!',{
        duration: 2000
      });
    }


  }
}

