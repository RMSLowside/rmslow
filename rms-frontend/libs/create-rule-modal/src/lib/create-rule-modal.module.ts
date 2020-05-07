import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@rms-frontend/core';
import { RuleBuildPieceComponent } from './create-rule-modal/rule-build-piece/rule-build-piece.component';
import { CreateRuleModalComponent } from './create-rule-modal/create-rule-modal.component';
import { CreateRuleComponent } from './create-rule-modal/create-rule/create-rule.component';
import { TestRuleComponent } from './create-rule-modal/test-rule/test-rule.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    RuleBuildPieceComponent,
    CreateRuleModalComponent,
    CreateRuleComponent,
    TestRuleComponent
  ],
  exports: [
    CreateRuleModalComponent
  ]
})
export class CreateRuleModalModule {}
