import { DustbinService } from './../Services/dustbin.service';
import { SectorService } from './../Services/sector.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sector } from 'src/app/Models/sector.model';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
@Component({
  selector: 'app-dustbin-log',
  templateUrl: './dustbin-log.component.html',
  styleUrls: ['./dustbin-log.component.css']
})
export class DustbinLogComponent implements OnInit{
  hide = true;
  minDate: Date;
  maxDate: Date;
  myForm: FormGroup;
  data: Sector[];
  timeNow = new Date();



  constructor(
    private route:ActivatedRoute,
    private service:DustbinService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ){
  
    this.myForm = this.formBuilder.group(
      { 
        dustbinNo:[""],
        garbageLevel:[""],
        updatedAt:[""],
      });
    

  }
  ngOnInit(){
    
    this.route.paramMap.subscribe(params => {
      const ID = params.get('id');    
        this.form.patchValue({      
           dustbinNo:'',
          garbageLevel:'',
          UpdatedAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
         
         });      
    })
    }
  form = new FormGroup({
    dustbinNo: new FormControl(''),
    garbageLevel: new FormControl(''),
    UpdatedAt: new FormControl(''),
  });

  createAndContinue(){
    let message='Submitted Successfuly';
    let action = 'Dustbin Log Added';

    // console.log(this.form.value);
    this.service.createGarbageLog(this.form.value);
    this._snackBar.open(message,action,{
      duration: 2000
    });
    this.resetForm();
  }
  resetForm(){
    this.form.reset();
    this.form.patchValue({      
      dustbinNo:'',
     garbageLevel:'',
     UpdatedAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
    
    });   
  }

 
}



