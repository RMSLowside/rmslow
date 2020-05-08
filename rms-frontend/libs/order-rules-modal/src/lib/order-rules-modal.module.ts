import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@rms-frontend/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OrderRulesModalComponent } from './order-rules-modal/order-rules-modal.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    OrderRulesModalComponent,
  ],
  exports: [
    OrderRulesModalComponent
  ]
})
export class OrderRulesModalModule {}
