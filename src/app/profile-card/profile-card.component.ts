import { EditProfileComponent } from './../workers/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './../change-password/change-password.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { User } from './../Models/user.model';
import { UserService } from './../Services/user.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'; 

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  dataMembers:User;
    constructor(
    private userService: UserService,
    private dialog: MatDialog,

    ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged( user =>{
      this.userService.getUserToEdit(user.uid).subscribe(data =>{
        this.dataMembers = data as User;
      })
    })
  }
  changePassword(){
    const dialogConfig  = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  this.dialog.open(ChangePasswordComponent,{
   height: '50%',
   width: '30%'
  });
  }
  editProfile(){
    const dialogConfig  = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  this.dialog.open(EditProfileComponent,{
   height: '70%',
   width: '40%'
  });
  }

}
