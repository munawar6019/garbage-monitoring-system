import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from './../Models/user.model';
import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { RegistrationService } from './registration.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{
  AppUser$: Observable<User>;
  constructor(
    private firestore: AngularFirestore,
    private regService: RegistrationService,
    private userService: UserService,
    private afAuth: AngularFireAuth
    ) { 
        
    }
    canActivate(): Observable<boolean>{
      if(this.regService.user
        .switchMap(user =>  this.userService.getSupervisorRole(user.uid))){
          return of(true);
        }

      
      

    }

}
