import { DustbinService } from './../../Services/dustbin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Component({
  selector: 'app-garbage-level-report',
  templateUrl: './garbage-level-report.component.html',
  styleUrls: ['./garbage-level-report.component.css']
})
export class GarbageLevelReportComponent implements OnInit {
  chart = [];
  dustbinNo : string;
  dustbinLabel : string;
  dustbinData : string;
  dustbinUpdatedAt : any[] = [];
  dustbinGarbageLevel : any[] =[];

  _bin :any[] = [];
  _binUpdateAt = [];
  _binGarbageLevel: any[]= [];

  graphData = []; 
  xLabels = [];

  constructor(
    private dustbinService:DustbinService,
    public dialogRef: MatDialogRef<GarbageLevelReportComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.dustbinNo = data.No;
    this.dustbinLabel = data.Label;
    this.DrawChart();
  }

  getGarbageLogData(){
    this.dustbinService.getGarbageLog(this.dustbinNo).subscribe(value =>{
     
      for(let entry of value){
        this.dustbinGarbageLevel.push(entry.payload.doc.data()['garbageLevel']);
        this.dustbinUpdatedAt.push(entry.payload.doc.data()['UpdatedAt']);
      }   

    });
    this.xLabels.push(this.dustbinUpdatedAt);
    this.graphData.push(this.dustbinGarbageLevel);
  }

   getRealTimeGarbageLog(){
    this.dustbinService.getRealtimeData().subscribe( data =>{
      return data.map( item => {
        if(item.payload.key == this.dustbinNo){
          console.log(item.payload.val()['level']);
          this._binGarbageLevel.push(item.payload.val()['level']);
        }
      });
    });
  }
  

  async DrawChart(){
    this.getRealTimeGarbageLog();
    console.log(this._binGarbageLevel);
    this.chart = new Chart('canvas',{
      type:'line',
      options:{
        responsive: true,
        title: {
          display: true,
          text: 'Garbage Level Chart'
        }
      },
      data : {
        labels: ['12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM'],
        // labels: this.xLabels[0],

        datasets:[
          {
            type: 'line',
            label: this.dustbinLabel,
            data: [1,3,5,6,7],
            // data: this.graphData[0],

            backgroundColor: '#3c8dbc',
            borderColor:'#3c8dbc',
            fill: true,
          }
        ]
      }
    });
  }

  ngOnInit(){
  

     
  }

}
