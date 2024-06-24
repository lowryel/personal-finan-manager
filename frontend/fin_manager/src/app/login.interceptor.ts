import { HttpInterceptorFn } from '@angular/common/http';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor is being called');
  const token = localStorage.getItem('token');
  
  if (token) {
    const clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    console.log('Token added to request');
    return next(clonedReq);
  }
  
  return next(req);
};