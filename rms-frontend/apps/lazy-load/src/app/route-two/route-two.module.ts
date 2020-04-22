import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteTwoRoutingModule } from './route-two-routing.module';
import { RouteTwoComponent } from './route-two/route-two.component';
import { CoreModule } from '@rms-frontend/core';

@NgModule({
  declarations: [RouteTwoComponent],
  imports: [CommonModule, CoreModule, RouteTwoRoutingModule]
})
export class RouteTwoModule {}
