import { enableProdMode } from '@angular/core';
import { defineTi8mCustomComponents } from './app/web-components/ti8m';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

if (environment.production) {
  enableProdMode();
}

defineTi8mCustomComponents();

bootstrapApplication(App, appConfig).catch(err => console.log(err));
