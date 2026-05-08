import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ListModule } from './../list/list.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    LoginRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ListModule,
    ComponentsModule,
    MatCardModule,
    MatSnackBarModule,
    LoginComponent,
  ],
})
export class LoginModule {}
