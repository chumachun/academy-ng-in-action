import { ListComponent } from './list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { hasUserGuard } from 'src/app/guards';

const routes: Routes = [
  {
    path: 'list',
    component: ListComponent,
    canActivate: [hasUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListRoutingModule {}
