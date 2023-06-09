import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  constructor(private firestore: AngularFirestore) { }

  createSector(sector){
    this.firestore.collection('Sectors').add(sector);
  }  
  getSector(){
    return this.firestore.collection('Sectors').snapshotChanges();         
  }
  deleteSector(id){
    if(confirm("Are you sure you want to delete this Record?")){
      this.firestore.doc('Sectors/'+ id).delete();
    }
  }
  getSectorToEdit(s){
    return this.firestore.doc('Sectors/'+s).valueChanges();
  }
  updateSector(id, data){
    return this.firestore.doc('Sectors/'+id).update(data);
  }
}

