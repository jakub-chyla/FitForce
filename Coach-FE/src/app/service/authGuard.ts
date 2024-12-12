import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const AuthGuard: CanActivateFn = (route, state) => {
  const role = localStorage.getItem('role'); // Get the user's role from localStorage
  const requiredRole = route.data?.['requiredRole']; // Get the required role from route data

  console.log('User role:', role);
  console.log('Required role:', requiredRole);

  if (role === requiredRole) {
    console.log('Access granted');
    return true; // Allow access if the roles match
  } else {
    console.log('Access denied');
    const router = inject(Router); // Inject the router
    router.navigate(['/unauthorized']); // Redirect to an unauthorized page
    return false; // Deny access
  }
};
