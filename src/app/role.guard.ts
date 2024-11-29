import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';  // Asegúrate de tener el servicio de autenticación

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  // Usamos inject() para obtener el servicio en una función
  const router = inject(Router);

  // Obtener los roles necesarios de la ruta
  const requiredRoles = route.data['roles'] as string[];

  // Verificar si el usuario está autenticado
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']); // Redirige al login si no está autenticado
    return false;
  }

  // Verificar si el usuario tiene al menos uno de los roles requeridos
  const userRoles = authService.getRolesSinPrefijo();  // Ajusta si tu método es diferente

  if (!userRoles.some(role => requiredRoles.includes(role))) {
    router.navigate(['/unauthorized']);  
    return false;
  }

  return true;  // Permite el acceso si cumple las condiciones
};
