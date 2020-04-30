import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule, MatDatepickerToggle } from '@angular/material/datepicker';

import { RangeRoutingModule } from './range-routing.module';
import { RangeComponent } from './range.component';

@NgModule({
  declarations: [RangeComponent],
  imports: [
    CommonModule,
    RangeRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDatepickerToggle
  ]
})
export class RangeModule {}
