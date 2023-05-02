import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  chart = [];

  constructor() { }

  ngOnInit(){
    this.chart = new Chart('bar',{
      type:'bar',
      options:{
        responsive: true,
        title: {
          display: true,
          text: 'Bar Chart'
        }
      },
      data : {
        labels: ['12:00 PM','01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','06:00 PM','07:00 PM','08:00 PM','09:00 PM','10:00 PM','11:00 PM'],
        datasets:[
          {
            type: 'bar',
            label: 'Dustbin-1221-JoharTown',
            data: [1,3,5,6,7,8,2,33,4,2,2,1,1,3,4,5,5,,65,6],
            backgroundColor: '#3c8dbc',
            borderColor:'#3c8dbc',
            fill: true,
          },
          {
            type: 'bar',
            label: 'Dustbin-25430-WapdaTown',
            data: [3,6,2,9,1,2,90,23,41,12,12,51,13,37,45,25,15,,65,6],
            backgroundColor: 'b8c7ce',
            borderColor:'#b8c7ce;',
            fill: true,
          }
        ]
      }
    })
  }

}
