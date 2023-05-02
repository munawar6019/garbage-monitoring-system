import { formatDate } from '@angular/common';
import { VehicleService } from './../../Services/vehicle.service';
import { Vehicle } from './../../Models/vehicle.model';
import { SectorService } from './../../Services/sector.service';
import { DustbinService } from './../../Services/dustbin.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Sector } from 'src/app/Models/sector.model';
@Component({
  selector: "app-add-vehicle",
  templateUrl: "./add-vehicle.component.html",
  styleUrls: ["./add-vehicle.component.css"]
})
export class AddVehicleComponent implements OnInit{
  hide = true;
  myForm: FormGroup;
  data: Sector[];
  timeNow = new Date();


  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:VehicleService,
    private sectorService:SectorService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ){
    this.myForm = this.formBuilder.group(
      { 
        vehicleNo: [""],
        vehicleSector: [""],
        vehicleDriver: [""],
        vehicleStatus: [""],
        assisstantDriver: [""],
        createdAt: [""],
        updatedAt: [""]


      });
    

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
    vehicleNo: new FormControl(''),
    vehicleSector: new FormControl(''),
    vehicleDriver: new FormControl(''),
    vehicleStatus: new FormControl(''),
    assisstantDriver: new FormControl(''),
    createdAt: new FormControl(''),
    UpdatedAt: new FormControl('')

  });

  create(){
    this.service.create(this.form.value);
    this.router.navigate(['/viewVehicle']);
  }
  createAndContinue(){
    let message='Submitted Successfully';
    let action = 'Vehicle Added';

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



