import { DustbinService } from './../Services/dustbin.service';
import { MakeRouteComponent } from './../make-route/make-route.component';
import { GarbageLevelReportComponent } from './../Reports/garbage-level-report/garbage-level-report.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Sector } from 'src/app/Models/sector.model';
import { MapService } from './../Services/map.service';
import { Component } from '@angular/core';
import { Dustbin } from '../Models/dustbin.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-driver-map',
  templateUrl: './driver-map.component.html',
  styleUrls: ['./driver-map.component.css']
})
export class DriverMapComponent  {
  dustbins :Dustbin[];
  sectors :Sector[];
  oLat:any;
  oLng:any;
  dLat:any[]=[];
  dLng:any[]=[];
  dDLat:Number;
  dDLng:Number;
  binNo:any;
  dir = undefined;

  constructor(
    private mapService: MapService,
    private dustbinService:DustbinService,
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
 getDustbinsData(n){
  this.dustbinService.getGarbageByNo(n).subscribe( actionArray =>{
    console.log(actionArray.length);
    for(let entry of actionArray){
      this.dDLat = entry.payload.doc.data()['dustbinLatitude'];
      this.dDLng = entry.payload.doc.data()['dustbinLongitude'];

      this.dLat.push(entry.payload.doc.data()['dustbinLatitude']);
      this.dLng.push(entry.payload.doc.data()['dustbinLongitude']);
    }
    console.log(this.dLat[0]);
    console.log(this.dLng[0]);
    this.getDirection();
  });
 }
 public getDirection() {
   console.log(this.oLat,'//',this.oLng);
   console.log(this.dDLat,'//',this.dDLng);

  this.dir = {
    origin: { lat: this.oLat, lng: this.oLng },
    destination: { lat: this.dDLat, lng: this.dDLng }
  }
}
 clickedMarker(n,lat,lng){
  this.oLat = lat;
  this.oLng =lng;
  
   const dialogConfig  = new MatDialogConfig();
   dialogConfig.disableClose = true;
   dialogConfig.autoFocus = true;
   dialogConfig.width = "60%";
   let dialogRef = this.dialog.open(MakeRouteComponent,{
    height: '250px',
    width: '300px'
   });
   dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    this.binNo = result;
    console.log(n)
    this.getDustbinsData(result);
    
  });
 }
 

}




