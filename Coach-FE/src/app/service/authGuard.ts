import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const AuthGuard: CanActivateFn = (route) => {
  const role = localStorage.getItem('role');
  const requiredRole = route.data?.['requiredRole'];

  if (role === requiredRole) {
    return true;
  } else {
    const router = inject(Router);
    router.navigate(['/unauthorized']);
    return false;
  }
};
