import { Chart } from 'chart.js';
import { DustbinService } from './../../Services/dustbin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-each-dustbin-garbage-levelreport',
  templateUrl: './each-dustbin-garbage-levelreport.component.html',
  styleUrls: ['./each-dustbin-garbage-levelreport.component.css']
})
export class EachDustbinGarbageLevelreportComponent implements OnInit {
  chart = [];
  dustbinNo : string;
  dustbinNoArray : any[] = [];
  dustbinLabel : any[] = [];
  dustbinUpdatedAt : any[] = [];
  dustbinGarbageLevel : any[] =[];
  dustbinLABEL:any;
  constructor(
    private dustbinService:DustbinService,
  ) { 
    this.getGarbageLogData();
  }
  getGarbageLogData(){
    this.dustbinService.getMaximumGarbageLog().subscribe(value =>{
      for(let entry of value){
        this.dustbinNoArray.push(entry.payload.doc.data()['dustbinNo']);
      }
      this.dustbinService.getGarbageLog(this.dustbinNoArray[0]).subscribe(value =>{
        for(let entry of value){
          this.dustbinGarbageLevel.push(entry.payload.doc.data()['garbageLevel']);
          this.dustbinUpdatedAt.push(entry.payload.doc.data()['UpdatedAt']);
          this.dustbinLabel.push(entry.payload.doc.data()['dustbinNo']);
        }
        this.dustbinLABEL = 'Bin '+this.dustbinLabel;
      console.log(this.dustbinLABEL);
      });
      
    });

  }

  ngOnInit(): void {
    this.chart = new Chart('canvas',{
      type:'line',
      options:{
        responsive: true,
        title: {
          display: true,
          text: 'Filled Dustbin of your Sector Chart'
        }
      },
      data : {
        // labels: ['12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM','07:00 PM','08:00 PM','09:00 PM','10:00 PM','11:00 PM'],
        labels: this.dustbinUpdatedAt,

        datasets:[
          {
            type: 'line',
            label: 'Dustbin',
            // data: [1,3,5,6,7,8,2,33,4,2,2,1,1,3,4,5,5,,65,6],
            data: this.dustbinGarbageLevel,

            backgroundColor: '#3c8dbc',
            borderColor:'#3c8dbc',
            fill: true,
          }
        ]
      }
    });
  }

}
