import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private firestore:AngularFirestore) { }
  getMembers(){
    return this.firestore.collection('Users').snapshotChanges();         
  }
  getUsers(){
    return this.firestore.collection('Users',ref=> ref.where('status','==','Disabled')).snapshotChanges();         
  } 
  getSectorUsers(s){
    return this.firestore.collection('Users',ref=> ref.where('status','==','Disabled').where('sector','==','Wapda Town')).snapshotChanges();         
  }  
  getFilledDustbins(s){
    return this.firestore.collection('Dustbins',ref=> ref.where('garbageLevel','>',80).where('sector','==',s)).snapshotChanges();         
  }
  getAllFilledDustbins(){
    return this.firestore.collection('Dustbins',ref=> ref.where('garbageLevel','>',80)).snapshotChanges();         
  }
  getTotalSectorDustbins(s){
    return this.firestore.collection('Dustbins',ref=> ref.where('sector','==',s)).snapshotChanges();         
  }
  getVehicles(){
    return this.firestore.collection('Vehicles').snapshotChanges();         

  }
}
