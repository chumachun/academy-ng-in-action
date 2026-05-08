import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { MatListModule } from '@angular/material/list';
import { FilterUserPipe } from 'src/app/pipes';
import { ComponentsModule } from 'src/app/components';

@NgModule({
  imports: [CommonModule, ListRoutingModule, MatListModule, ComponentsModule, ListComponent, FilterUserPipe],
  exports: [ListComponent],
})
export class ListModule {}
