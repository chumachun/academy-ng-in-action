import { enableProdMode, importProvidersFrom } from '@angular/core';
import { defineTi8mCustomComponents } from './app/web-components/ti8m';
import { environment } from './environments/environment';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app/app-routing.module';
import { FeaturesModule } from './app/features';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ComponentsModule } from './app/components/components.module';
import { AppComponent } from './app/app.component';

if (environment.production) {
  enableProdMode();
}

defineTi8mCustomComponents();

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, MatButtonModule, AppRoutingModule, FeaturesModule, MatToolbarModule, ComponentsModule),
        provideHttpClient(withInterceptorsFromDi()),
    ],
})
  .catch(err => console.log(err));
