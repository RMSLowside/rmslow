import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@rms-frontend/core';
import { DateRangeComponent } from './date-range/date-range.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],
  declarations: [
    DateRangeComponent
  ],
  exports:[DateRangeComponent]
})
export class DateRangeModule {}
