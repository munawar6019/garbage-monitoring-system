import { formatDate } from '@angular/common';
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
  selector: "app-add-sector",
  templateUrl: "./add-sector.component.html",
  styleUrls: ["./add-sector.component.css"]
})
export class AddSectorComponent {
  hide = true;
  minDate: Date;
  maxDate: Date;
  myForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  timeNow = new Date();
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:SectorService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ){
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 2, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.myForm = this.formBuilder.group(
      { 
        sectorNumber:[""],
        sectorEmail:[""],
        sectorContact:[""],
        sectorLabel:[""],
        sectorDescription:[""],
        sectorArea:[""],
        sectorCity:[""],
        sectorLng:[""],
        sectorLat:[""],
        sectorRadius:[""],
        sectorBackground:[""],
        createdAt:[""],
        UpdatedAt:[""]

      }

    );
  }
  ngOnInit(){
  
    this.route.paramMap.subscribe(params => {
      const ID = params.get('id');     
        this.form.patchValue({
          sectorNumber:'',
          sectorEmail:'',
          sectorContact:'',
          sectorLabel:'',
          sectorDescription:'',
          sectorArea:'',
          sectorCity:'',
          sectorLng:'',
          sectorLat:'',
          sectorRadius:'',
          sectorBackground:'',
          createdAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
          UpdatedAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US')
         });      
    })
    }
  form = new FormGroup({
    sectorNumber: new FormControl(''),
    sectorEmail: new FormControl("", [
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
    ]),
    sectorContact: new FormControl(''),
    sectorLabel: new FormControl(''),
    sectorDescription: new FormControl(''),
    sectorArea: new FormControl(''),
    sectorCity: new FormControl(''),
    sectorLng: new FormControl(''),
    sectorLat: new FormControl(''),
    sectorRadius: new FormControl(''),
    sectorBackground: new FormControl(''),
    createdAt: new FormControl(''),
    UpdatedAt: new FormControl('')



  });

  createSector(){
    console.log(this.form.value);
    this.service.createSector(this.form.value);
    this.router.navigate(['/viewSector']);
  }
  createSectorAndContinue(){
    let message='Submitted Successfuly';
    let action = 'Sector Added';

    this.service.createSector(this.form.value);
    this._snackBar.open(message,action,{
      duration: 2000
    });
    this.resetForm();
  }
  resetForm(){
    this.form.reset();
  }
}
