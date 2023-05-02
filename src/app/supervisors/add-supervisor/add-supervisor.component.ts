import { formatDate } from '@angular/common';
import { Sector } from './../../Models/sector.model';
import { SectorService } from './../../Services/sector.service';
import { RegistrationService } from './../../Services/registration.service';
import { Router } from '@angular/router';
import { logging } from 'protractor';
import { User } from './../../Models/user.model';
import { UserService } from './../../Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import {
  FormGroupDirective,
  NgForm
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
  selector: "app-add-supervisor",
  templateUrl: "./add-supervisor.component.html",
  styleUrls: ["./add-supervisor.component.css"]
})
export class AddSupervisorComponent {
  hide = true;
  myForm: FormGroup;
  list:User[];
  data: Sector[];

  matcher = new MyErrorStateMatcher();
  timeNow = new Date();

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:UserService,
    private sectorService:SectorService,
    private regService:RegistrationService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ){
    this.myForm = this.formBuilder.group(
      { 
        username:[""],
        email:[""],
        phone:[""],
        role:[""],
        workDescription:[""],
        date:[""],
        sector:[""],
        password: ["",
          [
            Validators.required,
            Validators.pattern(
              "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
            )
          ]
        ],
        confirmPassword: [""],
      },
      { validator: this.checkPasswords }
    );
  }
  ngOnInit(){
  
    this.route.paramMap.subscribe(params => {
      const ID = params.get('id');     
        this.form.patchValue({
          username:'',
          status:'Disabled',
          email:'',
           phone:'',
           sector:'',
           role:'Supervisor',
           workDescription:'',
           createdAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
           UpdatedAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
           lastSignout:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
          
         });      
    });

    this.sectorService.getSector().subscribe( actionArray =>{
      let count = actionArray.length;
      this.data  = actionArray.map(item =>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Sector
        }
      });
    });

    }
  form = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$")
    ]),
    email: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
    ]),
    phone: new FormControl(''),
    status: new FormControl(''),
    sector: new FormControl(''),
    role: new FormControl(''),
    workDescription: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    createdAt: new FormControl(''),
    UpdatedAt: new FormControl(''),
    lastSignout: new FormControl('')


  });

  createSupervisor(){
    this.regService.createNewUser(this.form.value);
    this.router.navigate(['/viewSupervisor']);
  }
  createSupervisorAndContinue(){
    let message='Submitted Successfuly';
    let action = 'Supervisor Added';

    this.regService.createNewUser(this.form.value);
    this._snackBar.open(message,action,{
      duration: 2000
    });
    this.resetForm();
  }
  resetForm(){
    this.form.reset();
    this.form.patchValue({
      role:'Supervisor',
      status:'Disabled',
      createdAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
      UpdatedAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
      lastSignout:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
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
