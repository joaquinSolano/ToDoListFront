import { ActivatedRouteSnapshot, CanMatchFn, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import { isBrowser } from '../utils/storage';

export const seguridadGuard= (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
    const lService=inject(LoginService)
    const router=inject(Router)
    // En el servidor (SSR) no hay sesion: no redirigir, el navegador vuelve a evaluar
    if (!isBrowser()) {
      return false;
    }
    const rpta=lService.verificar();
    if(!rpta){
      router.navigate(['/login']);
      return false;
    }
    return rpta;
};
