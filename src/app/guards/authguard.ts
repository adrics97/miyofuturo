import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../services/login.service";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private loginService: LoginService, private router: Router) {}
  
    canActivate(): boolean {
        if (this.loginService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}