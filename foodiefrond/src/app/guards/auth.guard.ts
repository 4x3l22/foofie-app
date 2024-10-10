import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const service = inject(LoginService);

  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';  // Verifica si está en el navegador

  if (isBrowser) {
    const user = service.getUser();
    const isLoggedIn = user !== null;
    const rolId = user ? user.loginDao.rolId : null;

    setInterval(() => {
      const token = localStorage.getItem('user');
      if (!token) {
        router.navigate(['/login']);
      }
    }, 100);

    if (!isLoggedIn) {
      console.log('Redirigiendo a login...');
      router.navigate(['/login']);
      return false;
    }

    if (route.routeConfig?.path === 'star' && rolId === 1) {
      return true;
    } else if (route.routeConfig?.path === 'iniouser' && rolId === 2) {
      return true;
    } else {
      console.log('Acceso denegado. Redirigiendo...');
      router.navigate(['/login']);
      return false;
    }
  } else {
    console.log('El entorno no es el navegador.');
    return false;
  }
};
