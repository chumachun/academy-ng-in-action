import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat.component';
import { hasUserGuard } from 'src/app/guards';

export const routes: Routes = [
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [hasUserGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
