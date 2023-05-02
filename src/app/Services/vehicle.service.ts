import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private firestore: AngularFirestore) { }

  create(data){
    this.firestore.collection('Vehicles').add(data);
  }  
  get(){
    return this.firestore.collection('Vehicles').snapshotChanges();         
  }
  getSectorVehicles(s){
    console.log(s);
    return this.firestore.collection('Vehicles',ref=> ref.where('vehicleSector','==',s)).snapshotChanges();        
  }
  delete(id){
    if(confirm("Are you sure you want to delete this Record?")){
      this.firestore.doc('Vehicles/'+ id).delete();
    }
  }
  getMalfunctionedVehicle(){
    return this.firestore.collection('Vehicles',ref=> ref.where('vehicleStatus','==','NotFunctioning')).snapshotChanges(); 
  }
  getToEdit(s){
    return this.firestore.doc('Vehicles/'+s).valueChanges();

  }
  updateVehicle(id, data){
    return this.firestore.doc('Vehicles/'+id).update(data);
  }
}

