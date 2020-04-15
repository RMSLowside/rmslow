import { Component, OnInit, NgModule, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionBase } from '../model/question-base';
import { QuestionService } from 'apps/lazy-load/src/app/+state/question.service';

@Component({
  selector: 'rms-frontend-dynamic-form-modal',
  templateUrl: './dynamic-form-modal.component.html',
  styleUrls: ['./dynamic-form-modal.component.scss']
})
export class DynamicFormModalComponent implements OnInit {
  @Input() forms: any;

  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }

  ngOnInit(): void {
  }
}