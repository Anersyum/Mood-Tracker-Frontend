import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {

    if (this.authService.isLoggedIn()) {

      this.router.navigateByUrl('/home');
      return false;
    }

    return true;
  }
  
}
