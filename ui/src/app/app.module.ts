import { ComponentsModule } from './components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FeaturesModule } from './features';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [AppComponent],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA], imports: [BrowserModule,
        MatButtonModule,
        AppRoutingModule,
        FeaturesModule,
        MatToolbarModule,
        ComponentsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
