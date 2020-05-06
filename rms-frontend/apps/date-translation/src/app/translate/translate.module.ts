import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateRoutingModule } from './translate-routing.module';
import { TranslateComponent } from './translate.component';
import { CoreModule } from '@rms-frontend/core';

@NgModule({
  declarations: [TranslateComponent],
  imports: [
    CoreModule,
    CommonModule,
    TranslateRoutingModule,
    FormsModule,
  ]
})
export class RangeModule {}
