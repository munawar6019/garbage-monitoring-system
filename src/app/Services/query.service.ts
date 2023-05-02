import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private firestore: AngularFirestore) { }

  addQuery(data){
    this.firestore.collection('Queries').add(data);
  }
  updateStatus(id,data){
    this.firestore.collection('Queries').doc(id).update({"status":data});
  }

  getPendingQuery(){
    return this.firestore.collection('Queries',
    ref=> ref.where('status','==','Pending')).snapshotChanges();   
  }
  getPendingQueryByMember(s){
    return this.firestore.collection('Queries',
    ref=> ref.where('status','==','Pending').where('sentBy','==',s.toString())).snapshotChanges();   
  }
}
