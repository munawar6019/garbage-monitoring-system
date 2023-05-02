import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  user: Observable<firebase.User>
  newUser: any;
  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();
  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore) {
    this.user = afAuth.authState;
     }
  createNewUser(user)
  {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.newUser = user;
        userCredential.user.updateProfile({
          displayName: user.username
        });
        return this.insertUserData(userCredential);
      })
      .catch(error => {
        return this.eventAuthError.next(error);
      })
  }
  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      password: this.newUser.password,
      username: this.newUser.username,
      role: this.newUser.role,  
      sector: this.newUser.sector,
      phone: this.newUser.phone,
      status: this.newUser.status,
      workDescription: this.newUser.workDescription,
      createdAt: this.newUser.createdAt,
      UpdatedAt: this.newUser.UpdatedAt,
      lastSignout: this.newUser.lastSignout


    })
  }
  LoginWithEmail(email: string, password: string) {
    
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.eventAuthError.next(error);
      })
      .then(userCredential =>{
        if(userCredential){
          this.router.navigate(['/homePage']);
        }
      })

  }
  LoginWithGoogle(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || 'home';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider);
  }
  LogOut(){
    this.afAuth.auth.signOut().then(() => {
      window.location.href = '/';
    });
  }


}
