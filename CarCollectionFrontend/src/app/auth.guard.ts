import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');

  if (token) {
    return true; // Permite el acceso si el token existe
  } else {
    const router = inject(Router); // Inyecta el servicio Router
    router.navigate(['/login']); // Redirige al login si no hay token
    return false;
  }
};
