import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxsModule } from '@ngxs/store';

import { CoreModule } from '@rms-frontend/core';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, CoreModule, HomeRoutingModule]
})
export class HomeModule {}
