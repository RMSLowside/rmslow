import { Component, OnInit, Input, NgModule } from '@angular/core';
import { CoreModule } from '@rms-frontend/core';

@Component({
  selector: 'rms-frontend-test-rule',
  templateUrl: './test-rule.component.html',
  styleUrls: ['./test-rule.component.scss']
})
export class TestRuleComponent implements OnInit {
  @Input() name: string = '';

  constructor() {}

  ngOnInit(): void {}
}

@NgModule({
  declarations: [TestRuleComponent],
  imports: [CoreModule]
})
class TestRuleComponentModule {}
