import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainModule } from './main';
import { ListModule } from './list';
import { ProfileModule } from './profile';
import { ChatModule } from './chat';
import { LoginModule } from './login';
import { ComponentsModule } from '../components';

@NgModule({
  imports: [CommonModule, MainModule, ListModule, ProfileModule, ChatModule, LoginModule, ComponentsModule],
})
export class FeaturesModule {}
