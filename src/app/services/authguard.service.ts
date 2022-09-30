import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { Router } from '@angular/router';
import { LocalStorageService } from './localStorageService.service';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate() {
        //Your redirect logic/condition. I use this.

        if (window.location.href.includes('1234')) {
          console.log('AuthGuard#canActivate called');
          this.LocalStorageService.set('isAdmin', 'true');
        //  this.router.navigate(['combos']);
          return true;
        } else {
          //this.router.navigate(['failed']);
          return false;
        }
    }
    //Constructor
    constructor(private router: Router, private LocalStorageService: LocalStorageService) { }
}
