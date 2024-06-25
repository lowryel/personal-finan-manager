import { HttpInterceptorFn } from '@angular/common/http';

// set interceptorto pass auth token to all protected request endpoints
export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    const clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` } // set authorization token header 
    });
    return next(clonedReq);
  }
  
  return next(req);
};