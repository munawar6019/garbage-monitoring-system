import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase'; 

@Injectable({
  providedIn: 'root'
})

export class DustbinService {
  timeNow = new Date();
  constructor(private firestore: AngularFirestore) { 
  }

  create(data){
    this.firestore.collection('Dustbins').add(data);
  }
  createGarbageLog(data){
    this.firestore.collection('DustbinGarbageLog').add(data);
  
  }  
  get(){
    return this.firestore.collection('Dustbins').snapshotChanges();         
  }
  getGarbageByNo(no){
    console.log(no)
    return this.firestore.collection('Dustbins',
    ref=> ref.where('dustbinNo','==',no)).snapshotChanges();         
  }
  getFilledDustbin(){
    return this.firestore.collection('Dustbins',ref => ref.where('garbageLevel','>',89)
    ).snapshotChanges();         
  }
  getCleanedByDustbin(username){
    return this.firestore.collection('Dustbins',
    ref=> ref.where('dustbinCleanedBy','==',username)).snapshotChanges();        
  }
  delete(id){
    if(confirm("Are you sure you want to delete this Record?")){
      this.firestore.doc('Dustbins/'+ id).delete();
    }
  }
  getToEdit(s){
    return this.firestore.doc('Dustbins/'+s).valueChanges();
  }
  updateDustbin(id, data){
    return this.firestore.doc('Dustbins/'+id).update(data);
  }
  updateLastSeenDustbin(id, data){
    console.log(id,'and',data)
    return this.firestore.doc('DustbinGarbageLog/'+id).set(data);
  }
  getGarbageLog(s){
    console.log(s);
    return this.firestore.collection('DustbinGarbageLog',
    ref=> ref.where('dustbinNo','==',s)).snapshotChanges();         
  }
  getTotalFilledDustbins(){
    return this.firestore.collection('Dustbins',
    ref=> ref.where('garbageLevel','>=',90)).snapshotChanges(); 
  }
  getMaximumGarbageLog(){
    return this.firestore.collection('DustbinGarbageLog',
    ref=> ref.orderBy('garbageLevel','asc').limit(1)).snapshotChanges();      
  }
  getMaximumGarbageLogOfDustbin(s){
    console.log(s);
    return this.firestore.collection('DustbinGarbageLog',
    ref=> ref.where('dustbinNo','==',s.toString()).orderBy('garbageLevel','asc').limit(1)).snapshotChanges();      
  }
  getSectorsDustbins(s){
    return this.firestore.collection('Dustbins',ref => ref.where('sector','==',s)
    ).snapshotChanges();         
  }
 
}

