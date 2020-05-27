import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CoreModule } from '@rms-frontend/core';
import { BarChartModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, CoreModule, HomeRoutingModule, BarChartModule]
})
export class HomeModule {}
