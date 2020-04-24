import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { DynamicFormModalComponent } from './dynamic-form-modal/dynamic-form-modal.component';
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question.component';
import { CoreModule } from '@rms-frontend/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component'

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxsFormPluginModule,
    CoreModule
  ],
  declarations: [
    DynamicFormModalComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent
  ]
})
export class DynamicFormsModule { }
