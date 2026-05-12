import { HttpInterceptorFn } from '@angular/common/http';

export const messageLoggingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/messages')) {
    const now = new Date().toISOString();
    const httpVerb = req.method;
    const endpoint = req.urlWithParams;

    console.debug(`[${now}] [${httpVerb}] ${endpoint}`);
  }

  return next(req);
};
