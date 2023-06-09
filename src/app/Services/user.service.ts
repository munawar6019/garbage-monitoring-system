import { formatDate } from '@angular/common';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { User } from './../Models/user.model';
import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase'; 
import 'rxjs/add/operator/switchMap';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  formData: User;
  userEmail: any;
  currentUser: User;
  timenow = new Date();
  user: firebase.User;
   ID:any;
  user_createdAt:string;
  constructor(private firestore: AngularFirestore) { 
        
  }
updateUser(id,data){
    return this.firestore.doc('Users/'+id).update(data);
    }
 getUser(){ 
      return this.firestore.collection('Users',ref=> ref.orderBy("name", "desc")).snapshotChanges();
 }
  getWorker(){
    return this.firestore.collection('Users',ref=> ref.where('createdAt','<',formatDate(this.timenow,'M/d/yy, h:mm a','en_US'))).snapshotChanges();         
  }
  deleteWorker(id){
    if(confirm("Are you sure you want to delete this Record?")){
      this.firestore.doc('Users/'+ id).delete();
    }
  }
  getSectorMembers(s,r){ 
     console.log(s);   
     return this.firestore.collection('Users',ref=> ref.where('sector','==',s).where('role','==',r)).snapshotChanges();  
   }
  getWorkerToEdit(s){
    
     return this.firestore.collection('Users',ref=> ref.where('id','==',s)).snapshotChanges();  
   }
  getUserToEdit(s){
    return this.firestore.doc('Users/'+s).valueChanges();
  }
  getSupervisor(){
    return this.firestore.collection('Users',ref=> ref.where('role','==','Supervisor')).snapshotChanges();         
  }
  getWorkers(){
    return this.firestore.collection('Users',ref=> ref.where('role','==','Worker')).snapshotChanges();         
  }
  getPendingUsers(){
    return this.firestore.collection('Users',ref=> ref.where('status','==','Disabled')).snapshotChanges();         
  }
  getPendingSupervisor(){
    return this.firestore.collection('Users',ref=> ref.where('status','==','Disabled').where('role','==','Supervisor')).snapshotChanges();         
  }
  getPendingWorker(){
      return this.firestore.collection('Users',ref=> ref.where('status','==','Disabled').where('role','==','Worker')).snapshotChanges();         
  }
  deleteSupervisor(id){
    if(confirm("Are you sure you want to delete this Record?")){
      this.firestore.doc('Users/'+ id).delete();
    }
  }
  getSupervisorBySector(s){
    return this.firestore.collection('Users',ref=> ref.where('sector','==',s).where('role','==','Supervisor')).snapshotChanges();
  }
  ActiveUser(id:string){
    this.firestore.collection('Users').doc(id).update({"status":"Active"});
  }
  DisableUser(id:string){
    this.firestore.collection('Users').doc(id).update({"status":"Disabled"});
  }
  updateLastSignOut(s):boolean{
    this.firestore.collection('Users').doc(s).update({"lastSignout":formatDate(this.timenow,'M/d/yy, h:mm a','en_US')});
    return true;
  }
  ChangePassword(id:string,password){
    this.firestore.collection('Users').doc(id).update({"password":password});
  }
  getSupervisorRole(s){
    return this.firestore.doc('Users/'+s).valueChanges();
  }
  getWorkerBySector(s){
    return this.firestore.collection('Users',ref=> ref.where('sector','==',s).where('role','==','Worker')).snapshotChanges();         
}
}
