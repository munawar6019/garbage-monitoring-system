import { formatDate } from '@angular/common';
import { SectorService } from './../../Services/sector.service';
import { Sector } from 'src/app/Models/sector.model';
import { DustbinService } from './../../Services/dustbin.service';
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
import { Dustbin } from 'src/app/Models/dustbin.model';

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
  selector: 'app-dustbin',
  templateUrl: './dustbin.component.html',
  styleUrls: ['./dustbin.component.css']
})
export class DustbinComponent implements OnInit{
  hide = true;
  minDate: Date;
  maxDate: Date;
  minLng: any = 45
  maxLng: any = 75
  minLat: any = 40
  maxLat: any = 76

  myForm: FormGroup;
  list:User[];
  matcher = new MyErrorStateMatcher();
  usernanme: any;
  status: any;
  data: Sector[];
  dustbin:Dustbin;
  ID:any;
  timeNow = new Date();

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private dustbinService:DustbinService,
    private sectorService:SectorService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ){
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 2, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
    this.myForm = this.formBuilder.group(
      { 
        updatedAt:[""]
      }
    );
  }
  ngOnInit(){
  
    this.route.paramMap.subscribe(params => {
      this.ID = params.get('id');
      console.log(this.ID);
      this.dustbinService.getToEdit(this.ID).subscribe( data =>{
       
          this.dustbin = data as Dustbin;
          this.form.patchValue({
            dustbinNo:this.dustbin.dustbinNo,
            sector:this.dustbin.sector,
            dustbinLatitude:this.dustbin.dustbinLatitude,
            dustbinLongitude:this.dustbin.dustbinLongitude,
            garbageLevel:this.dustbin.garbageLevel,
            updatedAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US')
           });
      });
            
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
  form = new FormGroup({
    dustbinNo: new FormControl(''),
    sector: new FormControl(''),
    dustbinLatitude: new FormControl(''),
    dustbinLongitude: new FormControl(''),
    garbageLevel: new FormControl(''),
    updatedAt: new FormControl('')


  });

  update(){
    this.dustbinService.updateDustbin(this.ID,this.form.value);
    this.router.navigate(['/viewDustbins']);
  }
  updateCancel(){
    this.router.navigate(['/viewDustbins']);
  }
}
