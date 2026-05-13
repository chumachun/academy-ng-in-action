import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideStore } from '@ngrx/store';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
import { messageLoggingInterceptor } from './chat/message-logging-interceptor';
import { userReducer } from './user/state/user-reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([messageLoggingInterceptor])),
    provideStore(),
    ...environment.providers,
    provideNativeDateAdapter(),
    provideStore({
      user: userReducer,
    }),
  ],
};
