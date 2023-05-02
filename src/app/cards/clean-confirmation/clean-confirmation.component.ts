import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { SectorService } from './../../Services/sector.service';
import { DustbinService } from './../../Services/dustbin.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, Optional } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sector } from 'src/app/Models/sector.model';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import * as firebase from 'firebase'; 
@Component({
  selector: 'app-clean-confirmation',
  templateUrl: './clean-confirmation.component.html',
  styleUrls: ['./clean-confirmation.component.css']
})
export class CleanConfirmationComponent implements OnInit{
  hide = true;
  myForm: FormGroup;
  data: Sector[];
  timeNow = new Date();
  formValue:any;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:DustbinService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CleanConfirmationComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public value: any
  ){ 
    this.formValue = value.pageValue;
    console.log(this.formValue);

    this.myForm = this.formBuilder.group(
      { 
        garbageLevel:["0"],
        dustbinCleanedBy:["Undefined"],
        updatedAt:[""],
        cleanedAt:[""]
      });
  }
  ngOnInit(){
    
    this.route.paramMap.subscribe(params => {
      const ID = params.get('id');    
        this.form.patchValue({      
          dustbinCleanedBy:'',
          garbageLevel:'0',
          UpdatedAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),         
          cleanedAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
         });      
    });
    }
  form = new FormGroup({
    garbageLevel: new FormControl(''),
    dustbinCleanedBy: new FormControl(''),
    cleanedAt: new FormControl(''),
    UpdatedAt: new FormControl('')
  });

  create(){

    firebase.auth().onAuthStateChanged(user =>{
      var userName = user.displayName;
      if(this.form.value.dustbinCleanedBy == userName){
        this.service.updateDustbin(this.formValue, this.form.value);
    this.router.navigate(['/homePage']);
      }else{
        this._snackBar.open('Your Username is not correct','Status cannot be Changed.',{
          duration: 2000
        });
      }
    })
  }
  createAndContinue(){
    let message='Submitted Successfuly';
    let action = 'Dustbin Added';

    this.service.create(this.form.value.updatedAt);
    this._snackBar.open(message,action,{
      duration: 2000
    });
    this.resetForm();
  }
  resetForm(){
    this.form.reset();
  }

 
}



