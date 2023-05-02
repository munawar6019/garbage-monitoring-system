import { formatDate } from '@angular/common';
import { SectorService } from './../../Services/sector.service';
import { DustbinService } from './../../Services/dustbin.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sector } from 'src/app/Models/sector.model';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
@Component({
  selector: "app-add-dustbins",
  templateUrl: "./add-dustbins.component.html",
  styleUrls: ["./add-dustbins.component.css"]
})
export class AddDustbinsComponent implements OnInit{
  hide = true;
  minDate: Date;
  maxDate: Date;
  myForm: FormGroup;
  data: Sector[];
  timeNow = new Date();



  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:DustbinService,
    private sectorService:SectorService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ){
  
    this.myForm = this.formBuilder.group(
      { 
        dustbinNo:[""],
        dustbinLabel:[""],
        sector:[""],
        dustbinLatitude:[""],
        dustbinLongitude:[""],
        garbageLevel:[""],
        dustbinCleanedBy:["Undefined"],
        createdAt:[""],
        updatedAt:[""],
        cleanedAt:[""]
      });
    

  }
  ngOnInit(){
    
    this.route.paramMap.subscribe(params => {
      const ID = params.get('id');    
        this.form.patchValue({      
           dustbinNo:'',
        dustbinCleanedBy:'Undefined',
          dustbinLabel:'',
          sector:'',
          dustbinLatitude:'78',
          dustbinLongitude:'444',
          garbageLevel:'',
          createdAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
          UpdatedAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
          cleanedAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
         
         });      
    })


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
    dustbinLabel: new FormControl(''),
    sector: new FormControl(''),
    dustbinLatitude: new FormControl(''),
    dustbinLongitude: new FormControl(''),
    garbageLevel: new FormControl(''),
    dustbinCleanedBy: new FormControl(''),
    createdAt: new FormControl(''),
    UpdatedAt: new FormControl(''),
    cleanedAt: new FormControl(''),
  });

  create(){
    console.log(this.form.value);
    this.service.create(this.form.value);
    this.router.navigate(['/viewDustbins']);
  }
  createAndContinue(){
    let message='Submitted Successfuly';
    let action = 'Dustbin Added';

    this.service.create(this.form.value);
    this._snackBar.open(message,action,{
      duration: 2000
    });
    this.resetForm();
  }
  resetForm(){
    this.form.reset();
  }

 
}



