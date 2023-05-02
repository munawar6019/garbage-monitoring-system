import { DustbinService } from './../../Services/dustbin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-garbage-level-report',
  templateUrl: './garbage-level-report.component.html',
  styleUrls: ['./garbage-level-report.component.css']
})
export class GarbageLevelReportComponent implements OnInit {
  chart = [];
  dustbinNo : string;
  dustbinLabel : string;
  dustbinUpdatedAt : any[] = [];
  dustbinGarbageLevel : any[] =[];
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

  async DrawChart(){
    await this.getGarbageLogData();
    console.log(this.dustbinUpdatedAt);
    console.log(this.dustbinGarbageLevel);

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
        // labels: ['12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM','07:00 PM','08:00 PM','09:00 PM','10:00 PM','11:00 PM'],
        labels: this.xLabels[0],

        datasets:[
          {
            type: 'line',
            label: this.dustbinLabel,
            // data: [1,3,5,6,7,8,2,33,4,2,2,1,1,3,4,5,5,,65,6],
            data: this.graphData[0],

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
