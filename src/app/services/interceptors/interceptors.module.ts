import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseUrlInterceptor, HTTP_BASE_URL } from './base-url.interceptor';

export interface InterceptorsConfig {
    baseUrl?: string | null | undefined;
}

export const InterceptorConfig: InterceptorsConfig = {
    baseUrl: 'https://api.datamuse.com/',
};

@NgModule({
    declarations: [],
    imports: []
})
export class InterceptorsModule {
    static forRoot(config: InterceptorsConfig): ModuleWithProviders {
        return {
            ngModule: InterceptorsModule,
            providers: [
                {
                    provide: HTTP_BASE_URL,
                    useValue: config.baseUrl
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: BaseUrlInterceptor,
                    multi: true
                }
            ]
        };
    }
}
