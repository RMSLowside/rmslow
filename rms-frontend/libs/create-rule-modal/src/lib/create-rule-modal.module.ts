import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@rms-frontend/core';
import { CreateRuleModalComponent } from './create-rule-modal/create-rule-modal.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule
  ],
  declarations: [
      CreateRuleModalComponent
    ]
})
export class CreateRuleModalModule {}
