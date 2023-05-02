import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DustbinService } from './../../Services/dustbin.service';
import { Chart } from 'chart.js';
import { Component, OnInit, Optional, Inject } from '@angular/core';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
   chart = [];
   dustbinNo : string;
   dustbinLabel : string;
   dustbinUpdatedAt : any[] = [];
   dustbinGarbageLevel : any[] =[];
  constructor(
    private dustbinService:DustbinService,
    // public dialogRef: MatDialogRef<LineChartComponent>,
    // @Optional() @Inject(MAT_DIALOG_DATA) public value: any
  ) { 
  // this.dustbinNo = value.No;
  // this.dustbinLabel = value.Label;
  }

  ngOnInit() {
    this.openDustbinGraph();
  }
  ReadDustbinsGarbageLog(){
    this.dustbinService.getGarbageLog(this.dustbinNo).subscribe(res =>{ 
      console.log(res.length)
      for(let entry of res){
        this.dustbinNo = entry.payload.doc.data()['dustbinNo'];
        // this.dustbinGarbageLevel = entry.payload.doc.data()['garbageLevel'];

        this.dustbinGarbageLevel.push(entry.payload.doc.data()['garbageLevel']);
        this.dustbinUpdatedAt.push(entry.payload.doc.data()['updatedAt']);
      }
    });
    console.log(this.dustbinUpdatedAt.length);
    console.log(this.dustbinGarbageLevel);


  }
      xLabels: any[] = [];
      chartData: any[] = [];
      
      async openDustbinGraph(){
        // await this.ReadDustbinsGarbageLog();
        this.xLabels.push(this.dustbinUpdatedAt);
        this.chartData.push(this.dustbinGarbageLevel);
        // console.log(this.xLabels);
        this.chart = new Chart('canvas',{
          type:'line',
          data : {
            labels: ['12','121'],
            datasets:[
              {
                label: ['Dustbin1002'],
                data: ['12','12','2','1','3'],
                backgroundColor: '#3c8dbc',
                borderColor:'#3c8dbc',
                fill: true,
              },
            ]
          },
          "options": {
            "legend": {"position": "bottom"},
            "scales": {
                "xAxes": [
                    {
                        "beginAtZero": true,
                        "ticks": {
                            "autoSkip": false
                        }
                    }
                ]
            }
        }
        });

      }

}
