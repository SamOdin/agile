import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InjectionToken, Inject } from '@angular/core';
import { Location } from '@angular/common';

export const HTTP_BASE_URL = new InjectionToken<string>('HTTP_BASE_URL');
const urlHasSchema = (url: string) => url && (url.startsWith('http://') || url.startsWith('https://'));

export class BaseUrlInterceptor implements HttpInterceptor {
    constructor(@Inject(HTTP_BASE_URL) private readonly httpBaseUrl: string) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!urlHasSchema(request.url)) {
            request = request.clone({
                url: Location.joinWithSlash(this.httpBaseUrl, request.url)
            });
        }

        return next.handle(request);
    }
}
