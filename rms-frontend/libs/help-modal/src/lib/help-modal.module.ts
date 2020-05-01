import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@rms-frontend/core';
import { HelpModalComponent } from './help-modal/help-modal.component';
import { HelpEditComponent } from './help-edit/help-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CoreModule
  ],
  declarations: [
    HelpModalComponent,
    HelpEditComponent
  ]
})
export class HelpModalModule { }
