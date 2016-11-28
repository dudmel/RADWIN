import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { Consts } from '../../shared';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {

    if (!!localStorage.getItem(Consts.jwtToken))
      return true;
    // if (tokenNotExpired(Consts.jwtToken)) {
    //   return true;
    // }

    this.router.navigate(['login']);
    return false;
  }
}