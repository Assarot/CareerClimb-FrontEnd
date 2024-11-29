import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError, of } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); 
  const accessToken = authService.getAccessToken(); 

  if (req.url.includes('/refresh') || req.url.includes('/logout')) {
    return next(req);
  }

  if (accessToken) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return next(clonedRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.warn('Token expirado. Intentando renovar...');

          return authService.refreshAccessToken().pipe(
            switchMap((newAccessToken) => {
              if (newAccessToken) {
                console.info('Token renovado exitosamente.');
                const newRequest = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                });
                return next(newRequest);
              } else {
                console.error('No se pudo renovar el token. Cerrando sesión.');
                authService.logout();
                return throwError(
                  () =>
                    new Error(
                      'Sesión expirada. Por favor, inicie sesión nuevamente.'
                    )
                );
              }
            }),
            catchError(() => {
              console.error(
                'Error al intentar renovar el token. Cerrando sesión.'
              );
              authService.logout();
              return throwError(
                () =>
                  new Error(
                    'Sesión expirada. Por favor, inicie sesión nuevamente.'
                  )
              );
            })
          );
        }

        // Si no es un error 401, propagar el error
        return throwError(() => error);
      })
    );
  }

  // Si no hay un token, continuar sin modificar la solicitud
  return next(req);
};
