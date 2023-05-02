import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../Services/user.service';
import { User } from './../../Models/user.model';
import { formatDate } from '@angular/common';
import { QueryService } from './../../Services/query.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'; 
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-supervisor-details',
  templateUrl: './supervisor-details.component.html',
  styleUrls: ['./supervisor-details.component.css']
})
export class SupervisorDetailsComponent implements OnInit {
  
  timeNow = new Date();
  supervisor:User[] = [];
  dataMembers:User;
  supervisorName: any[]=[];
  supervisorEmail: any[]=[];
  supervisorPhone: any[]=[];
  supervisorCreatedAt: any[]=[];



  form = new FormGroup({
    subject: new FormControl(''),
    status : new FormControl(''),
    description: new FormControl(''),
    sentTo: new FormControl(''),
    sentBy: new FormControl(''),
    createdAt: new FormControl(''),
    UpdatedAt: new FormControl('')
  });
  constructor(
    private query:QueryService,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router:Router,

    public dialogRef: MatDialogRef<SupervisorDetailsComponent>

    ) {
     }

  ngOnInit(): void {
    
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        this.userService.getUserToEdit(user.uid).subscribe(data =>{
          this.dataMembers = data as User;
          this.userService.getSupervisorBySector(this.dataMembers.sector).subscribe(actionArray =>{

            for(let entry of actionArray){
              this.supervisorName.push(entry.payload.doc.data()['username']);
              this.supervisorEmail.push(entry.payload.doc.data()['email']);
              this.supervisorPhone.push(entry.payload.doc.data()['phone']);
              this.supervisorCreatedAt.push(entry.payload.doc.data()['createdAt']);
              this.form.patchValue({
                subject: '',
              status : 'Pending',
              description: '',
              sentBy:user.displayName,
              sentTo:this.supervisorName[0],
              createdAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
              UpdatedAt:formatDate(this.timeNow,'M/d/yy, h:mm a','en_US'),
              });
            }
          });
        })
      }else{
        console.log("No USER lOGIN");
      }


    })
    
  }

  createQuery(){
    this.query.addQuery(this.form.value);
    this.router.navigate(['/homePage']);
    this._snackBar.open('Submitted Successfully','Query has been sent to the Supervisor.',{
      duration: 2000
    });
  }
  onCloseDialog(){
    this.dialogRef.close();
  }

}
