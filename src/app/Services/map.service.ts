import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private firestore: AngularFirestore) { }

  getDustbins(){
    return this.firestore.collection('Dustbins').snapshotChanges();         
  }
  getSectors(){
    return this.firestore.collection('Sectors').snapshotChanges();         
  }


}
