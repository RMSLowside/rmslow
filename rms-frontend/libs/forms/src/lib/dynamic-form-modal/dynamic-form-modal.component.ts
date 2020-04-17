import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from '../model/question-base';

@Component({
  selector: 'rms-dynamic-form-modal',
  templateUrl: './dynamic-form-modal.component.html',
  styleUrls: ['./dynamic-form-modal.component.scss']
})
export class DynamicFormModalComponent implements OnInit {
  @Input() questions: QuestionBase<any>[];
  @Input() clearOnDestroy: boolean;
  @Output() outputEvent: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.form = this.toFormGroup(this.questions);
  }

  saveAsDraft() {
    this.outputEvent.emit(this.form.value);
  }

  toFormGroup(questions: QuestionBase<string>[]) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });

    return new FormGroup(group);
  }
}