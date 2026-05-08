import { ListModule } from './../list/list.module';
import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    imports: [
        CommonModule,
        ChatRoutingModule,
        ComponentsModule,
        FormsModule,
        ListModule,
        MatTabsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatDividerModule,
        MatCardModule,
        ChatComponent,
    ],
})
export class ChatModule { }
