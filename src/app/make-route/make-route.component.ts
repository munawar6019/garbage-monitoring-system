import { DustbinService } from './../Services/dustbin.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from './../Models/user.model';
import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'; 
import { Dustbin } from '../Models/dustbin.model';
@Component({
  selector: 'app-make-route',
  templateUrl: './make-route.component.html',
  styleUrls: ['./make-route.component.css']
})
export class MakeRouteComponent implements OnInit {
  dataMembers:User;
  dustbin:Dustbin[];
  dustbinLat:Dustbin[];
  dustbinLng:Dustbin[];


  constructor(
    private dustbinService: DustbinService,
    private userService:UserService
  ) {
   }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
          this.userService.getUserToEdit(user.uid).subscribe(data =>{
            this.dataMembers = data as User;
            console.log(this.dataMembers.sector);
            this.dustbinService.getSectorsDustbins(this.dataMembers.sector).subscribe( actionArray =>{
              let count = actionArray.length;
              this.dustbin  = actionArray.map(item =>{
                return {
                  id: item.payload.doc.id,
                  ...item.payload.doc.data() as Dustbin
                }
              });
            });
          })
      }else{
        console.log("User is not Signed In");
      }
    })
  }

}
