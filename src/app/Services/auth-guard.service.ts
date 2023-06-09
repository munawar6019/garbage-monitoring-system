import { RegistrationService } from './registration.service';
import { Injectable } from '@angular/core';
import { CanActivate,Router, RouterStateSnapshot } from '@angular/router';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: RegistrationService, private route: Router) { }
  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user.pipe(map(user => {
      if (user) return true;

      this.route.navigate(['/'], { queryParams: { returnUrl: state.url } });
      return false;
    }))
  }
}
