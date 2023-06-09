import { Sector } from 'src/app/Models/sector.model';
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
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.css']
})
export class SectorsComponent{
  hide = true;
  myForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  usernanme: any;
  status: any;
  sector:Sector;
  ID:any;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private sectorService:SectorService,
    private formBuilder: FormBuilder  ){

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
        sectorBackground:[""]
      }
    );
  }
  ngOnInit(){
  
    this.route.paramMap.subscribe(params => {
      this.ID = params.get('id');
      console.log(this.ID);
      this.sectorService.getSectorToEdit(this.ID).subscribe( data =>{
       
          this.sector = data as Sector;
          this.form.patchValue({
            sectorNumber:this.sector.sectorNumber,
          sectorEmail:this.sector.sectorEmail,
          sectorContact:this.sector.sectorContact,
          sectorLabel:this.sector.sectorLabel,
          sectorDescription:this.sector.sectorDescription,
          sectorArea:this.sector.sectorArea,
          sectorCity:this.sector.sectorCity,
          sectorLng:this.sector.sectorLng,
          sectorLat:this.sector.sectorLat,
          sectorRadius:this.sector.sectorRadius,
          sectorBackground:this.sector.sectorBackground,

           });
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
    sectorBackground: new FormControl('')

  });

  updateSector(){
    this.sectorService.updateSector(this.ID,this.form.value);
    this.router.navigate(['/viewSector']);
  }
  updateSectorCancel(){
    this.router.navigate(['/viewSector']);
  }
}
