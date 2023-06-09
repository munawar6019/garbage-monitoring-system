import { QueryService } from './../Services/query.service';
import { SectorService } from './../Services/sector.service';
import { TotalRegisteredVehiclesComponent } from './../total-registered-vehicles/total-registered-vehicles.component';
import { TotalFilledDustbinsComponent } from './../total-filled-dustbins/total-filled-dustbins.component';
import { SectorPendingMembersComponent } from './../sector-pending-members/sector-pending-members.component';
import { VehicleService } from './../Services/vehicle.service';
import { DustbinService } from './../Services/dustbin.service';
import { SupervisorDetailsComponent } from './../cards/supervisor-details/supervisor-details.component';
import { SectorMembersComponent } from './../cards/sector-members/sector-members.component';
import { CleanedDustbinsComponent } from './../cards/cleaned-dustbins/cleaned-dustbins.component';
import { RegisteredVehiclesComponent } from './../cards/registered-vehicles/registered-vehicles.component';
import { LineChartComponent } from './../Reports/line-chart/line-chart.component';
import { BarChartComponent } from './../Reports/bar-chart/bar-chart.component';
import { FilledDustbinsComponent } from './../cards/filled-dustbins/filled-dustbins.component';
import { Router } from '@angular/router';
import { AddVehicleComponent } from './../vehicle/add-vehicle/add-vehicle.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { UserService } from './../Services/user.service';
import { Dustbin } from 'src/app/Models/dustbin.model';
import { User } from './../Models/user.model';
import { CardService } from './../card.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Component } from '@angular/core';
import { Vehicle } from '../Models/vehicle.model';
import { formatDate } from '@angular/common';
import { RegisteredMembersComponent } from '../cards/registered-members/registered-members.component';
import * as firebase from 'firebase'; 
import { concatAll } from 'rxjs/operators';
import 'firebase/database';

export interface PeriodicElement {
  name: string;
  position: number;
  phoneNumber: number;
  gender: string;
  email: string;
  address: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: firebase.User;
  userInfo:User;
  info: any;
  filledDustbins: number=0;
  totalDustbins:number=0;
  tFDustbins:number;
  tDustbins:number;

  yourCleanedDustbins:number=0;

  cleansingRate: number = this.filledDustbins / this.totalDustbins;
  tCleansingRate:number;
  tCleanedDustbinsRate:number;
  pendingMembers:any;
  dataMembers:User;
  newSectors:number = 0;
  newBins:number = 0;
  newVehicles:number = 0;

  mySupervisors:number = 0;
  myWorkers:number = 0;

  totalVehiclesCost: number = 0;
  sectorVehicles: any;
  totalVehicles:any;
  totalWorkers: any;
  totalSupervisors: any;

  sectorFilledDustbin1: number = 0;
  sectorFilledDustbin2: number = 0;
  sectorMembers:any;
  totalMembers: any;
  sectorPendingMembers:any;

  malfunctionedVehicles: number = 0;
  pendingQueries : number = 0;
  totalQueries : number = 0;
  disabledUsers : number = 0;
  vehicleDrivers : number = 0;


  


  userData: MatTableDataSource<any>;

  dustbinGarbageLevel: any[]=[];
  dateCreatedAt: any[] = [];
  users: User[];
  bins: Dustbin[];
  vehicles: Vehicle[];
  timeNow = new Date();
  constructor( 
    private cards:CardService,
    private dialog: MatDialog,
    private userService: UserService,
    private vehicleSERVICE: VehicleService,
    private sectorService: SectorService,
    private router:Router,
    private dustbinService: DustbinService,
    private query: QueryService
    ) {
   this.getdata();
    this.getPendingQueries();  
    this.getFilledDustbins();
    this.getCountMembers();
    this.getDisabledMembers();
    this.getVehicles();
    this.getTotalVehicles();
    this.getSectorMembers();
    this.getSectorDisabledMembers();
    this.getCleansingRate();
    this.getTotalFilledDustbins();
    this.getTotalWorkers();
     
  }
  displayedColumns: string[] = [
    "select",
    "Username",
    "Email",
    "Sector",
    "Phone",
    "Joining_Date",
    "Status"
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.position + 1}`;
  }
  getCountMembers(){
     this.cards.getMembers().subscribe(actionArray =>{
      this.totalMembers = actionArray.length;
      this.users  = actionArray.map(item =>{
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as User
        }
      });
    });
  }

// // Initialize Firebase app
// const firebaseConfig = {
//   apiKey: '<YOUR_API_KEY>',
//   authDomain: '<YOUR_AUTH_DOMAIN>',
//   databaseURL: 'https://smartgarbagecollection-da9fc.firebaseio.com',
//   projectId: '<YOUR_PROJECT_ID>',
//   storageBucket: '<YOUR_STORAGE_BUCKET>',
//   messagingSenderId: '<YOUR_MESSAGING_SENDER_ID>',
//   appId: '<YOUR_APP_ID>'
// };

// firebase.initializeApp(firebaseConfig);
  private database = firebase.database();

  // Retrieve data
  private Data = this.database.ref('Data');
  
  getdata(){
    this.Data.on('value', (snapshot) => {
      const data = snapshot.val();
      const bin1Status = data.Bin_1_Status;
      console.log('Bin 1 Status:', bin1Status);
      this.sectorFilledDustbin1=data.Bin_1_level
      this.sectorFilledDustbin2=data.Bin_2_level
      
    });
}

  getTotalWorkers(){
    this.userService.getSupervisor().subscribe( data =>{
      this.mySupervisors = data.length;
    });
    this.userService.getWorkers().subscribe(data =>{
      this.myWorkers = data.length;
    })
    }
  getCleansingRate(){
    let current = this.timeNow.setDate(this.timeNow.getDate()-1);
    this.dustbinService.get().subscribe( value =>{
      this.totalDustbins = value.length;
      for(let entry of value){
        this.dateCreatedAt.push( new Date(entry.payload.doc.data()['createdAt']));
      }
      for(let i=0; i< this.dateCreatedAt.length;i++){
        if(this.dateCreatedAt[i] > current){
          this.newBins++;
        }
      }
      console.log(this.newBins);
    });
  }
  getFilledDustbins(){
    firebase.auth().onAuthStateChanged( user =>{
      if(user){
        this.userService.getUserToEdit(user.uid).subscribe(data =>{
          this.dataMembers = data as User;
          this.cards.getFilledDustbins(this.dataMembers.sector).subscribe(actionArray =>{
          // this.sectorFilledDustbins = actionArray.length; 
          // console.log('hellochattha'+this.sectorFilledDustbins)
            this.bins  = actionArray.map(item =>{
              return {
                id: item.payload.doc.id,
                ...item.payload.doc.data() as Dustbin
              }
            });
            console.log('bins:chat'+this.bins)
            this.cards.getTotalSectorDustbins(this.dataMembers.sector).subscribe( value =>{
              this.totalDustbins = value.length;
              // console.lo
              console.log('dist')
              console.log(this.totalDustbins)
                    this.cleansingRate = ((this.sectorFilledDustbin2+this.sectorFilledDustbin1)/2);
                    this.cleansingRate = 100 - this.cleansingRate;
              })

          });
        })
      }    
    })  
  }
  
  getVehicles(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
          this.userService.getUserToEdit(user.uid).subscribe(data =>{
            this.dataMembers = data as User;
            this.vehicleSERVICE.getSectorVehicles(this.dataMembers.sector).subscribe(actionArray =>{
              this.sectorVehicles = actionArray.length;
            });
            this.vehicleSERVICE.getMalfunctionedVehicle().subscribe(actionArray =>{
              this.malfunctionedVehicles = actionArray.length;
            });
          });
        }
      });
  }
  getPendingQueries(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
          this.userService.getUserToEdit(user.uid).subscribe(data =>{
            this.dataMembers = data as User;
            this.query.getPendingQueryByMember(this.dataMembers.username).subscribe(actionArray =>{
              this.pendingQueries = actionArray.length;
            });
            this.query.getPendingQuery().subscribe(actionArray =>{
              this.totalQueries = actionArray.length;
            });
          });
        }
      });
  }
  getTotalVehicles(){
    let current = this.timeNow.setDate(this.timeNow.getDate()-1);
    this.vehicleSERVICE.get().subscribe( data =>{
      this.totalVehicles = data.length;
      this.totalVehiclesCost = this.totalVehicles * 1200;
      for(let entry of data){
        this.dateCreatedAt.push( new Date(entry.payload.doc.data()['createdAt']));
      }
      for(let i=0; i< this.dateCreatedAt.length;i++){
        if(this.dateCreatedAt[i] > current){
          this.newVehicles++;
        }
      }
    });
  }
  getSectorMembers(){
    let current = this.timeNow.setDate(this.timeNow.getDate()-1);
    this.sectorService.getSector().subscribe(data =>{
      for(let entry of data){
        this.dateCreatedAt.push( new Date(entry.payload.doc.data()['createdAt']));
      }
      for(let i=0; i< this.dateCreatedAt.length;i++){
        if(this.dateCreatedAt[i] > current){
          this.newSectors++;
        }
      }
    })

    firebase.auth().onAuthStateChanged(user =>{
      if(user){
          this.userService.getUserToEdit(user.uid).subscribe(data =>{
            this.dataMembers = data as User;
            this.userService.getSectorMembers(this.dataMembers.sector, this.dataMembers.role).subscribe(actionArray =>{
               console.log("Sector Members",actionArray.length);
               this.sectorMembers = actionArray.length;
            });
          })
      }else{
        console.log("User is not Signed In");
      }
    })
  }

  

  getTotalFilledDustbins(){
    this.dustbinService.getTotalFilledDustbins().subscribe( value =>{
      this.tFDustbins = value.length;
       this.dustbinService.get().subscribe(data =>{
         this.tDustbins = data.length;
      this.tCleanedDustbinsRate = this.tDustbins - this.tFDustbins;
      this.tCleanedDustbinsRate = this.tCleanedDustbinsRate * 15;
         this.tCleansingRate = (this.tFDustbins/this.tDustbins)*100;
         this.tCleansingRate = 100 - this.tCleansingRate;
       })       
      })
  }
  getDisabledMembers(){
    this.cards.getUsers().subscribe(actionArray =>{
     this.pendingMembers = actionArray.length;
     this.disabledUsers = actionArray.length;
      this.info  = actionArray.map(item =>{
       return {
         id: item.payload.doc.id,
         ...item.payload.doc.data() as User
       }   
     });
     this.userData = new MatTableDataSource(this.info);
     this.userData.sort = this.sort;
     this.userData.paginator = this.paginator;

   });
  }
  getSectorDisabledMembers(){
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
          this.userService.getUserToEdit(user.uid).subscribe(data =>{
            this.dataMembers = data as User;
            this.cards.getSectorUsers(this.dataMembers.sector).subscribe(actionArray =>{
              this.sectorPendingMembers = actionArray.length;
               this.info  = actionArray.map(item =>{
                return {
                  id: item.payload.doc.id,
                  ...item.payload.doc.data() as User
                }   
              });
              this.userData = new MatTableDataSource(this.info);
              this.userData.sort = this.sort;
              this.userData.paginator = this.paginator;
         
            });
          })
        }
      })

    
  }
 editStatus(id){
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "200%";
  this.dialog.open(AddVehicleComponent,{
    height: '100%',
    width: '40%'
});
 }
 changeStatus(id){
  this.userService.ActiveUser(id);
    this.router.navigate(['/homePage']);
 }
 openFilledDustbins()
 {
  const dialogConfig  = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(FilledDustbinsComponent,{
   height: '70%',
   width: '60%'
  });
 }
 openTotalFilledDustbins()
 {
  const dialogConfig  = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(TotalFilledDustbinsComponent,{
   height: '80%',
   width: '60%'
  });
 }
 openUnregisteredMembers()
 {
  const dialogConfig  = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(RegisteredMembersComponent,{
   height: '80%',
   width: '60%'
  });
 }
 openSectorPendingMember(){

  const dialogConfig  = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(SectorPendingMembersComponent,{
   height: '75%',
   width: '60%'
  });
 }
 openCleansingRate()
 {
  const dialogConfig  = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(LineChartComponent,{
   height: '400px',
   width: '600px'
  });
 }
 openRegisteredVehicle(){
  const dialogConfig  = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(RegisteredVehiclesComponent,{
    height: '80%',
   width: '60%'
  });
 }
 openTotalRegisteredVehicle(){
  const dialogConfig  = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(TotalRegisteredVehiclesComponent,{
    height: '80%',
   width: '60%'
  });
 }
 openCleanedDustbins(){
  const dialogConfig  = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(CleanedDustbinsComponent,{
   height: '75%',
   width: '60%'
  });
 }
 openSectorMember(){

  const dialogConfig  = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(SectorMembersComponent,{
   height: '75%',
   width: '60%'
  });
 }
 openSuprevisorDetails(){
  const dialogConfig  = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.width = "60%";
  this.dialog.open(SupervisorDetailsComponent,{
   height: '75%',
   width: '60%'
  });
 }

}
