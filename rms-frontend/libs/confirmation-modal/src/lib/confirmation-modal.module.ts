import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { CoreModule } from '@rms-frontend/core';

@NgModule({
  imports: [CoreModule, CommonModule],
  exports: [ConfirmationModalComponent],
  declarations: [ConfirmationModalComponent]
})
export class ConfirmationModalModule {}
