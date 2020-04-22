import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteTwoRoutingModule } from './route-two-routing.module';
import { RouteTwoComponent } from './route-two/route-two.component';


@NgModule({
  declarations: [RouteTwoComponent],
  imports: [
    CommonModule,
    RouteTwoRoutingModule
  ]
})
export class RouteTwoModule { }
