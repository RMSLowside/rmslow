import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteTwoRoutingModule } from './route-two-routing.module';
import { RouteTwoComponent } from './route-two/route-two.component';
import { CoreModule } from '@rms-frontend/core';
import { VersionHistoryModule } from '@rms-frontend/version-history';

@NgModule({
  declarations: [RouteTwoComponent],
  imports: [
    CommonModule,
    CoreModule,
    RouteTwoRoutingModule,
    VersionHistoryModule
  ]
})
export class RouteTwoModule {}
