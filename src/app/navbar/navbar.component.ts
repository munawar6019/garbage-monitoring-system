import { formatDate } from '@angular/common';
import { VehicleService } from './../Services/vehicle.service';
import { QueryService } from './../Services/query.service';
import { Notification } from './../Models/notifications.model';
import { DustbinService } from './../Services/dustbin.service';
import { NotificationsService } from './../Services/notifications.service';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UserService } from './../Services/user.service';
import { User } from './../Models/user.model';
import { RegistrationService } from './../Services/registration.service';
import { ProfileCardComponent } from './../profile-card/profile-card.component';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'; 
import { Observable } from 'rxjs';
import { AnyARecord } from 'dns';
import { sign } from 'crypto';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  timeNow = new Date();
    hide:any;
    filledDustbinsNumber: any;
    filledDustbinId:any[]=[];
    filledDustbinLastSeen:any[]=[];
    filledDustbinsMessage: any[] =[];

    pendingQueryNumber: any;
    pendingQueryId:any[]=[];
    pendingQueryLastSeen:any[]=[];
    pendingQueryMessage: any[] =[];

    pendingWorkerNumber: any;
    pendingWorkerId:any[]=[];
    pendingWorkerLastSeen:any[]=[];
    pendingWorkerMessage: any[] =[];

    pendingSupervisorNumber: any;
    pendingSupervisorId:any[]=[];
    pendingSupervisorLastSeen:any[]=[];
    pendingSupervisorMessage: any[] =[];

    malfunctionVehicleNumber: any;
    malfunctionVehicleId:any[]=[];
    malfunctionVehicleLastSeen:any[]=[];
    malfunctionVehicleMessage: any[] =[];

    sectorMemberNumber: any;
    sectorMemberId:any[]=[];
    sectorMemberLastSeen:any[]=[];
    sectorMemberMessage: any[] =[];

    yourCleanedDustbinNumber: any;
    yourCleanedDustbinId:any[]=[];
    yourCleanedDustbinLastSeen:any[]=[];
    yourCleanedDustbinMessage: any[] =[];


      
      list:User[];
      user: firebase.User;
      userData: User;
      currentUser:any;
      ID:any;
      private userProfile: AngularFirestoreDocument<User>;
  constructor(private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private reg:RegistrationService,
    private userService:UserService,
    private notification:NotificationsService,
    private vehicle:VehicleService,
    private dustbin:DustbinService,
    private router:Router,
    private query:QueryService
    ) {
      this.typeOfFilledDustbins();
               
    }

    ngOnInit() {
      
      this.typeOfFilledDustbins();
      this.typeOfPendingQueries();
      this.typeOfPendingSupervisor();
      this.typeOfPendingWorker();
      this.typeOfMalfunctionVehicle();
      this.typeOfSectorMember();
      this.typeOfYourCleanedDustbins();

    }  
    
    openDialog() {
    const dialogRef = this.dialog.open(ProfileCardComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  Signout(){
    firebase.auth().onAuthStateChanged(ref =>{
      this.ID = ref.uid;
      if(this.userService.updateLastSignOut(ref.uid)){
      this.userService.updateLastSignOut(ref.uid);
      this.reg.LogOut();
      }
    })
  }
  Profile(){
    this.router.navigate(['/profile']);
  }
  typeOfFilledDustbins(){
    firebase.auth().onAuthStateChanged(ref =>{
      this.ID = ref.uid;
      this.userService.getUserToEdit(this.ID).subscribe(data =>{
         this.userData = data as User;
        //  console.log(this.userData.lastSignout);
         let signoutDate = new Date(this.userData.lastSignout);
         console.log("Signout",signoutDate);
         this.dustbin.getFilledDustbin().subscribe(bins =>{
          this.filledDustbinsNumber = bins.length;
        // console.log(this.filledDustbinsNumber);
          if(this.filledDustbinsNumber > 0){
            this.notification.getTypeofFilledDustbin().subscribe(actionArray =>{
             
              for(let entry of actionArray){
              this.filledDustbinId.push(entry.payload.doc.id);
                this.filledDustbinsMessage.push(entry.payload.doc.data()['message']);
                this.filledDustbinLastSeen.push(entry.payload.doc.data()['lastSeenAt']);
              }
         let lastSeenDate = new Date(this.filledDustbinLastSeen[0]);
         console.log("Last Seen",lastSeenDate);
         if(lastSeenDate < signoutDate){
           this.hide = true;
         }else{
          this.hide = false;
         }
            });
          }

        });
      });
    });  
  }

  typeOfPendingQueries(){
    firebase.auth().onAuthStateChanged(ref =>{
      this.ID = ref.uid;
      this.userService.getUserToEdit(this.ID).subscribe(data =>{
         this.userData = data as User;
         let signoutDate = new Date(this.userData.lastSignout);
        this.query.getPendingQuery().subscribe(query =>{
          this.pendingQueryNumber = query.length;
          if(this.pendingQueryNumber > 0){
            this.notification.getTypeofPendingQueries().subscribe(actionArray =>{
              for(let entry of actionArray){
                this.pendingQueryId.push(entry.payload.doc.id);
                  this.pendingQueryMessage.push(entry.payload.doc.data()['message']);
                  this.pendingQueryLastSeen.push(entry.payload.doc.data()['lastSeenAt']);
                }
                let lastSeenDate = new Date(this.pendingQueryLastSeen[0]);
                if(lastSeenDate < signoutDate){
                  this.hide = true;
                }else{
                  this.hide = false;
                }
            })
          }
        });
      });
    });  
  }

  typeOfPendingSupervisor(){
    firebase.auth().onAuthStateChanged(ref =>{
      this.ID = ref.uid;
      this.userService.getUserToEdit(this.ID).subscribe(data =>{
         this.userData = data as User;
         let signoutDate = new Date(this.userData.lastSignout);
        this.userService.getPendingSupervisor().subscribe(query =>{
          this.pendingSupervisorNumber = query.length;
          // console.log(this.pendingSupervisorNumber);
          if(this.pendingSupervisorNumber > 0){
            this.notification.getTypeofPendingSupervisor().subscribe(actionArray =>{
              for(let entry of actionArray){
                this.pendingSupervisorId.push(entry.payload.doc.id);
                  this.pendingSupervisorMessage.push(entry.payload.doc.data()['message']);
                  this.pendingSupervisorLastSeen.push(entry.payload.doc.data()['lastSeenAt']);
                }
          // console.log(this.pendingSupervisorMessage[0]);
                let lastSeenDate = new Date(this.pendingSupervisorLastSeen[0]);
                if(lastSeenDate < signoutDate){
                  this.hide = true;
                }else{
                  this.hide = false;
                }
            })
          }
        });
      });
    });  
  }

  typeOfPendingWorker(){
    firebase.auth().onAuthStateChanged(ref =>{
      this.ID = ref.uid;
      this.userService.getUserToEdit(this.ID).subscribe(data =>{
         this.userData = data as User;
         let signoutDate = new Date(this.userData.lastSignout);
        this.userService.getPendingWorker().subscribe(query =>{
          this.pendingWorkerNumber = query.length;
          if(this.pendingWorkerNumber > 0){
            this.notification.getTypeofPendingWorker().subscribe(actionArray =>{
              for(let entry of actionArray){
                this.pendingWorkerId.push(entry.payload.doc.id);
                  this.pendingWorkerMessage.push(entry.payload.doc.data()['message']);
                  this.pendingWorkerLastSeen.push(entry.payload.doc.data()['lastSeenAt']);
                }
                let lastSeenDate = new Date(this.pendingWorkerLastSeen[0]);
                if(lastSeenDate < signoutDate){
                  this.hide = true;
                }else{
                  this.hide = false;
                }
            })
          }
        });
      });
    });  
  }

  typeOfMalfunctionVehicle(){
    firebase.auth().onAuthStateChanged(ref =>{
      this.ID = ref.uid;
      this.userService.getUserToEdit(this.ID).subscribe(data =>{
         this.userData = data as User;
         let signoutDate = new Date(this.userData.lastSignout);
        this.vehicle.getMalfunctionedVehicle().subscribe(query =>{
          this.malfunctionVehicleNumber = query.length;
          if(this.malfunctionVehicleNumber > 0){
            this.notification.getTypeofMalfunctionVehicle().subscribe(actionArray =>{
              for(let entry of actionArray){
                this.malfunctionVehicleId.push(entry.payload.doc.id);
                  this.malfunctionVehicleMessage.push(entry.payload.doc.data()['message']);
                  this.malfunctionVehicleLastSeen.push(entry.payload.doc.data()['lastSeenAt']);
                }
                let lastSeenDate = new Date(this.malfunctionVehicleLastSeen[0]);
                if(lastSeenDate < signoutDate){
                  this.hide = true;
                }else{
                  this.hide = false;
                }
            })
          }
        });
      });
    });  
  }
  typeOfSectorMember(){
    firebase.auth().onAuthStateChanged(ref =>{
      this.ID = ref.uid;
      this.userService.getUserToEdit(this.ID).subscribe(data =>{
         this.userData = data as User;
         let signoutDate = new Date(this.userData.lastSignout);
        this.userService.getSectorMembers(this.userData.sector,this.userData.role).subscribe(query =>{
          this.sectorMemberNumber = query.length;
          if(this.sectorMemberNumber > 0){
            this.notification.getTypeofSectorMember().subscribe(actionArray =>{
              for(let entry of actionArray){
                this.sectorMemberId.push(entry.payload.doc.id);
                  this.sectorMemberMessage.push(entry.payload.doc.data()['message']);
                  this.sectorMemberLastSeen.push(entry.payload.doc.data()['lastSeenAt']);
                }
                let lastSeenDate = new Date(this.sectorMemberLastSeen[0]);
                if(lastSeenDate < signoutDate){
                  this.hide = true;
                }else{
                  this.hide = false;
                }
            })
          }
        });
      });
    });  
  }
  typeOfYourCleanedDustbins(){
    firebase.auth().onAuthStateChanged(ref =>{
      this.ID = ref.uid;
      this.userService.getUserToEdit(this.ID).subscribe(data =>{
         this.userData = data as User;
         let signoutDate = new Date(this.userData.lastSignout);
        //  console.log("Last Signout:",signoutDate);
        this.dustbin.getCleanedByDustbin(this.userData.username).subscribe(query =>{
          this.yourCleanedDustbinNumber = query.length;
          if(this.yourCleanedDustbinNumber > 0){
            this.notification.getTypeofYourCleanedDustbins().subscribe(actionArray =>{
              for(let entry of actionArray){
                this.yourCleanedDustbinId.push(entry.payload.doc.id);
                  this.yourCleanedDustbinMessage.push(entry.payload.doc.data()['message']);
                  this.yourCleanedDustbinLastSeen.push(entry.payload.doc.data()['lastSeenAt']);
                }
                let lastSeenDate = new Date(this.yourCleanedDustbinLastSeen[0]);
                if(lastSeenDate < signoutDate){
                  this.hide = true;
                }else{
                  this.hide = false;
                }
            })
          }
        });
      });
    });  
  }



  filledDustbins(s){
    let log = {
      lastSeenAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US')
    }
    this.dustbin.updateLastSeenDustbin(s,log);
    this.notification.setTypeofFilledDustbin(s);
    this.router.navigate(['/filledDustbins']);
  }
  pendingQueries(s){
    this.notification.setTypeofFilledDustbin(s);
    this.router.navigate(['/pendingQueries']);
  }
  pendingSupervisors(s){
    this.notification.setTypeofFilledDustbin(s);
    this.router.navigate(['/pendingSupervisors']);
  }
  PendingWorkers(s){
    this.notification.setTypeofFilledDustbin(s);
    this.router.navigate(['/PendingWorkers']);
  }
  malfunctionVehicles(s){
    this.notification.setTypeofFilledDustbin(s);
    this.router.navigate(['/malfunctionVehicles']);
  }
  sectorMembers(s){
    this.notification.setTypeofFilledDustbin(s);
    this.router.navigate(['/sectorMembers']);
  }
  yourCleanedDustbins(s){
    this.notification.setTypeofFilledDustbin(s);
    this.router.navigate(['/yourCleanedDustbins']);
  }
  

}

