import { SectorService } from './../../Services/sector.service';
import { Sector } from './../../Models/sector.model';
import { formatDate } from '@angular/common';
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
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent {
  hide = true;
  myForm: FormGroup;
  list:User[];
  matcher = new MyErrorStateMatcher();
  usernanme: any;
  status: any;
  user:User;
  ID:any;
  timeNow = new Date();
  data: Sector[];



  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private userService:UserService,
    private regService:RegistrationService,
    private formBuilder: FormBuilder,
    private sectorService:SectorService,
    private _snackBar: MatSnackBar
  ){

    this.myForm = this.formBuilder.group(
      { 
        username:[""],
        email:[""],
        phone:[""],
        role:[""],
        sector:[""]
      }
    );
  }
  ngOnInit(){
  
    this.route.paramMap.subscribe(params => {
      this.ID = params.get('id');
      console.log(this.ID);
      this.userService.getUserToEdit(this.ID).subscribe( data =>{
       
          this.user = data as User;
          console.log(this.user.username);
          this.form.patchValue({
            username: this.user.username,
            email:this.user.email,
             phone:this.user.phone,
             sector:this.user.sector,
             role:this.user.role,
             UpdatedAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
            
           });
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
    sector: new FormControl(''),
    role: new FormControl(''),

  });

  updateSupervisor(){
    this.userService.updateUser(this.ID,this.form.value);
    this.router.navigate(['/viewWorker']);
  }
  updateSupervisorCancel(){
    this.router.navigate(['/viewWorker']);
  }
}
