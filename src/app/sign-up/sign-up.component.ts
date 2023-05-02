import { Sector } from './../Models/sector.model';
import { SectorService } from './../Services/sector.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistrationService } from './../Services/registration.service';
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatSnackBar } from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );

    return invalidCtrl || invalidParent;
  }
}

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit{
  hide = true;
  myForm: FormGroup;
  authError: any;
  selected = 'Common';
  matcher = new MyErrorStateMatcher();
  timeNow = new Date();
  data: Sector[];



  email = new FormControl("", [
    Validators.required,
    Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
  ]);
  username = new FormControl("", [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern("^[a-zA-Z]+[a-zA-Z0-9]*$")
  ]);

  constructor(
    private formBuilder: FormBuilder,
    private reg:RegistrationService,
    private _snackBar: MatSnackBar,
    private sectorService:SectorService,
    private route:ActivatedRoute,
    private router:Router

    ) {
       const currentYear = new Date().getFullYear();
    this.myForm = this.formBuilder.group(
      { 
        username:[],
        email:[],
        status:["Disabled"],
        phone:[],
        role:[],
        workDescription:[],
        sector:[],
        password: [,
          [
            Validators.required,
            Validators.pattern(
              "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            )
          ]
        ],
        confirmPassword: [],
        createdAt:[this.timeNow],
        UpdatedAt:[this.timeNow],
        lastSignout:[this.timeNow]
      },
      { validator: this.checkPasswords }
    );
  }
  ngOnInit() {
    this.reg.eventAuthError$.subscribe( data =>{
      this.authError = data;
    });

    this.sectorService.getSector().subscribe( actionArray =>{
      let count = actionArray.length;
      console.log(count);
      this.data  = actionArray.map(item =>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Sector
        }
      });
    console.log(this.data);
    });
  }

  CreateUser(){
    let message='Submitted Successfuly';
    let action = 'You have been Added';
     console.log(this.myForm.value);
     let response = this.reg.createNewUser(this.myForm.value);
     console.log(response);
     this.router.navigate(['/']);
     this._snackBar.open(message,action,{
      duration: 2000
    });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }
  get password() {
    return this.myForm.get("password");
  }
}
