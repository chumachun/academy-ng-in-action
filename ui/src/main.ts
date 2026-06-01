import { bootstrapApplication } from '@angular/platform-browser';

import { App } from './app/app';
import { appConfig } from './app/app.config';
import { defineCustomComponents } from './app/web-components/ti8m';

defineCustomComponents();

bootstrapApplication(App, appConfig).catch(err => console.error(err));
