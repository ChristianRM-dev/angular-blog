import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export function apiBaseUrlInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  // Determine if it's a public or admin endpoint
  const baseUrl = environment.apiBaseUrl;

  // Clone the request and prepend the base URL
  const clonedRequest = req.clone({
    url: `${baseUrl}${req.url}`, // Concatenate the base URL with the request URL
  });

  // Pass the cloned request to the next handler
  return next(clonedRequest);
}
