import { UserService } from './../../../Services/user.service';
import { DustbinService } from './../../../Services/dustbin.service';
import { SectorService } from './../../../Services/sector.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  chart = [];
  sectorsName : any[] = [];
  sectorsDustbinCount : any[] = [];
  sectorsColor : any[] = [];
  constructor(
    private sectorService: SectorService,
    private sectorWorker: UserService    
  ) {
    this.getSectors();
   }
  getSectors(){
    
    this.sectorService.getSector().subscribe( value =>{
      for(let entry of value){
        this.sectorsName.push(entry.payload.doc.data()['sectorArea']);
        this.sectorsColor.push(entry.payload.doc.data()['sectorBackground']);
        this.sectorWorker.getWorkerBySector(entry.payload.doc.data()['sectorArea']).subscribe(ref =>{
          this.sectorsDustbinCount.push(ref.length);
        })
       }
    })
  }

  ngOnInit(){
    this.chart = new Chart('pie',{
      type:'pie',
      options:{
        responsive: true,
        title: {
          display: true,
          text: 'Workers in each Sector'
        },legend: {
          position: 'top',
        },animation:{
          animateScale: true,
          animateRotate:true
        }

      },
      data : {
        datasets:[
          {
            label: 'Towns Comparison',
            data: this.sectorsDustbinCount.reverse(),
            backgroundColor: this.sectorsColor
          }
        ],
        labels: this.sectorsName
      }
    })
  }

}
