import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../model/question-base';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] = [];
  @Input() form: FormGroup;
  @Input() clearOnDestroy: boolean = false;
  payLoad = '';

  ngOnInit() {
  }
}
