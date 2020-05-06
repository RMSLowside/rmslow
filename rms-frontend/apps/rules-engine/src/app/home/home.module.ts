import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgxsModule } from '@ngxs/store';

import { CoreModule } from '@rms-frontend/core';
import { GridModule } from '@rms-frontend/grid';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    HomeRoutingModule,
    GridModule
  ]
})
export class HomeModule {}
