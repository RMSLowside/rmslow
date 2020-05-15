import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@rms-frontend/core';
import { TextAddModalComponent } from './text-add-modal/text-add-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],
  declarations: [
    TextAddModalComponent
  ],
  exports:[TextAddModalComponent]
})
export class TextAddModalModule {}
