import { Component, OnInit, Input, NgModule } from '@angular/core';
import { CoreModule } from '@rms-frontend/core';

@Component({
  selector: 'rms-frontend-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.scss']
})
export class CreateRuleComponent implements OnInit {
  @Input() name: string = '';

  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  declarations: [CreateRuleComponent],
  imports: [CoreModule]
})
class CreateRuleComponentModule {}
