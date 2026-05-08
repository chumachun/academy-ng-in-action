import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { ChatboardComponent } from './chatboard';
import { ChatmessageComponent } from './chatmessage';
import { AvatarComponent } from './avatar';
import { UserComponent } from './user';

const components = [ChatboardComponent, ChatmessageComponent, AvatarComponent, UserComponent];

@NgModule({
  imports: [CommonModule, RouterModule, MatListModule, MatSelectModule, ...components],
  exports: components,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
