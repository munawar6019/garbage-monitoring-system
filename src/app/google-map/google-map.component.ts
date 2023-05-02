import { GarbageLevelReportComponent } from './../Reports/garbage-level-report/garbage-level-report.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Sector } from 'src/app/Models/sector.model';
import { MapService } from './../Services/map.service';
import { Component } from '@angular/core';
import { Dustbin } from '../Models/dustbin.model';
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent  {
  dustbins :Dustbin[];
  sectors :Sector[];

  constructor(
    private mapService: MapService,
    private dialog :MatDialog
  ) { 
    this.getDustbins();
    this.getSectors();
  }
 // google maps zoom level
 zoom: number = 13;
 // initial center position for the map
 lat: number = 31.4697;
 lng: number = 74.2728;
 lat1: number = 31.4282;
 lng1: number = 74.2678; 
 
 getDustbins(){
  this.mapService.getDustbins().subscribe( actionArray =>{
    this.dustbins = actionArray.map (item =>{
      return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Dustbin
      }
    });
  });
 }
 getSectors(){
  this.mapService.getSectors().subscribe( actionArray =>{
    this.sectors = actionArray.map (item =>{
      return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Sector
      }
    });
  });
 }
 clickedMarker(no,label){
   const dialogConfig  = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   dialogConfig.width = "60%";
   this.dialog.open(GarbageLevelReportComponent,{
    height: '400px',
    width: '600px',
    data: {No: no, Label: label}
   });
 }
 

}




