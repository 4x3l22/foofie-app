import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const service = inject(LoginService);

  const isLoggedIn = service.isLoggedIn();
  console.log('Usuario autenticado:', isLoggedIn);

  setInterval(()=>{
    var  token = localStorage.getItem('user');
    if(token == null){
      router.navigate(['/login']);
    }

  },100)

  if (isLoggedIn) {
    return true;
  } else {
    console.log('Redirigiendo a login...');
    router.navigate(['/login']);
    return false;
  }
};
