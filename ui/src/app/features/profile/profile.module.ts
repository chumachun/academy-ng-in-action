import { ListModule } from './../list/list.module';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [CommonModule, MatCardModule, ComponentsModule, ListModule, ProfileRoutingModule, ProfileComponent],
})
export class ProfileModule {}
