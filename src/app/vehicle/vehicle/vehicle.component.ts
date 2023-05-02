import { formatDate } from '@angular/common';
import { VehicleService } from './../../Services/vehicle.service';
import { Vehicle } from './../../Models/vehicle.model';
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
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  hide = true;
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
  vehicle:Vehicle;
  ID:any;
  timeNow = new Date();


  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private vehicleService:VehicleService,
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
        updatedAt:[""]
      }
    );
  }
  ngOnInit(){
  
    this.route.paramMap.subscribe(params => {
      this.ID = params.get('id');
      console.log(this.ID);
      this.vehicleService.getToEdit(this.ID).subscribe( data =>{
       
          this.vehicle = data as Vehicle;
          this.form.patchValue({
            
            vehicleNo:this.vehicle.vehicleNo, 
            vehicleSector:this.vehicle.vehicleSector, 
            vehicleDriver:this.vehicle.vehicleDriver, 
            vehicleStatus:this.vehicle.vehicleStatus, 
            assisstantDriver:this.vehicle.assisstantDriver,
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
    vehicleNo: new FormControl(''),
    vehicleSector: new FormControl(''),
    vehicleDriver: new FormControl(''),
    vehicleStatus: new FormControl(''),
    assisstantDriver: new FormControl(''),
    updatedAt: new FormControl(''),
  });

  update(){
    this.vehicleService.updateVehicle(this.ID,this.form.value);
    this.router.navigate(['/viewVehicle']);
  }
  updateCancel(){
    this.router.navigate(['/viewVehicle']);
  }
}
