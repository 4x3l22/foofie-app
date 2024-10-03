import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const service = inject(LoginService);

  const user = service.getUser(); // Obtener el usuario del localStorage
  const isLoggedIn = user !== null;
  const rolId = user ? user.loginDao.rolId : null; // Ajusta esto para acceder a rolId correctamente

  setInterval(()=>{
    var  token = localStorage.getItem('user');
    if(token == null){
      router.navigate(['/login']);
    }

  },100)

  // Redirigir si el usuario no está autenticado
  if (!isLoggedIn) {
    console.log('Redirigiendo a login...');
    router.navigate(['/login']);
    return false;
  }

  // Validación de roles
  if (route.routeConfig?.path === 'star' && rolId === 1) {
    return true; // Admin puede acceder a 'star'
  } else if (route.routeConfig?.path === 'iniouser' && rolId === 2) {
    return true; // Usuario puede acceder a 'iniouser'
  } else {
    console.log('Acceso denegado. Redirigiendo...');
    router.navigate(['/login']);
    return false;
  }
};
