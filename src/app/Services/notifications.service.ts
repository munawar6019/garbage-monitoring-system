import { formatDate } from '@angular/common';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  timenow = new Date();
  constructor(
    private firestore: AngularFirestore
  ) { }
  getTypeofFilledDustbin(){
    return this.firestore.collection('Notifications',ref => ref.where('typeOf','==','filledDustbins')
    ).snapshotChanges();         
  }
  setTypeofFilledDustbin(s){

    this.firestore.collection('Notifications').doc(s).update({"lastSeenAt":formatDate(this.timenow,'M/d/yy, h:mm a','en_US')});
  }
  getTypeofPendingQueries(){
    return this.firestore.collection('Notifications',ref => ref.where('typeOf','==','pendingQueries')
    ).snapshotChanges();         
  }
  
  getTypeofPendingSupervisor(){
    return this.firestore.collection('Notifications',ref => ref.where('typeOf','==','disabledSupervisor')
    ).snapshotChanges();         
  }

  getTypeofPendingWorker(){
    return this.firestore.collection('Notifications',ref => ref.where('typeOf','==','disabledWorker')
    ).snapshotChanges();         
  }
 
  getTypeofMalfunctionVehicle(){
    return this.firestore.collection('Notifications',ref => ref.where('typeOf','==','malfunctionedVehicle')
    ).snapshotChanges();         
  }
 
  getTypeofSectorMember(){
    return this.firestore.collection('Notifications',ref => ref.where('typeOf','==','sectorMembers')
    ).snapshotChanges();         
  }
 
  getTypeofYourCleanedDustbins(){
    return this.firestore.collection('Notifications',ref => ref.where('typeOf','==','yourCleanedDustbins')
    ).snapshotChanges();         
  }
 


}
