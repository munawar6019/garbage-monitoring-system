import { DustbinService } from './../../../Services/dustbin.service';
import { SectorService } from './../../../Services/sector.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-douhgnut-chart',
  templateUrl: './douhgnut-chart.component.html',
  styleUrls: ['./douhgnut-chart.component.css']
})
export class DouhgnutChartComponent implements OnInit {
  chart = [];
  sectorsName : any[] = [];
  sectorsDustbinCount : any[] = [];
  sectorsColor : any[] = [];
  constructor(
    private sectorService: SectorService,
    private dustbinService: DustbinService
  ) {
    this.getSectors();
   }
   getSectors(){
     this.sectorService.getSector().subscribe( value =>{
       for(let entry of value){
        this.sectorsName.push(entry.payload.doc.data()['sectorArea']);
        this.sectorsColor.push(entry.payload.doc.data()['sectorBackground']);
        this.dustbinService.getSectorsDustbins(entry.payload.doc.data()['sectorArea']).subscribe(ref =>{
          this.sectorsDustbinCount.push(ref.length);
        })
       }
     });
   }

  ngOnInit(){
    
    this.chart = new Chart('doughnut',{
      type:'doughnut',
      options:{
        responsive: true,
        title: {
          display: true,
          text: 'Dustbins in Each Sector'
        },legend: {
          position: 'top',
        },animation:{
          animateScale: true,
          animateRotate:true
        }

      },
      data : {
        // labels: ['Johar Town','Wapda Town','LDA Society','Muslim Town','Iqbal Town'],
        labels: this.sectorsName,

        

        datasets:[
          {
            label: 'Towns Comparison',
            data: this.sectorsDustbinCount,
            backgroundColor: this.sectorsColor
          }
        ]
      }
    })
  }
}
