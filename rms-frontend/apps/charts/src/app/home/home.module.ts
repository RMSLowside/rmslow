import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CoreModule } from '@rms-frontend/core';
import { PieChartModule } from '@swimlane/ngx-charts';
import { LineChartModule } from '@swimlane/ngx-charts';
import { GridModule } from '@rms-frontend/grid';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    GridModule,
    CoreModule,
    HomeRoutingModule,
    PieChartModule,
    LineChartModule
  ]
})
export class HomeModule {}
