import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import {
  DropdownQuestion,
  QuestionBase,
  TextboxQuestion
} from '@rms-frontend/forms';
import { DynamicFormModalComponent } from 'libs/forms/src/lib/dynamic-form-modal/dynamic-form-modal.component';
import { Observable } from 'rxjs';
import {
  SaveToDraft,
  SetFormsGroup,
  GetHelpContent,
  SetHelpContent
} from './+state/forms.actions';
import { FormState } from './+state/forms.state';
import { GlobalState, SetTheme, Login, AuthState } from '@rms-frontend/core';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'rms-frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'NGXS Forms';
  checked = false;
  @Select(FormState) test$: Observable<any>;
  @Select(FormState.formGroup) formGroup$: Observable<FormGroup>;
  @Select(FormState.drafts) drafts$: Observable<any>;
  @Select(FormState.helpContents) helpContent$: Observable<any>;

  constructor(
    public dialog: MatDialog,
    public store: Store,
    public overlayContainer: OverlayContainer
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new GetHelpContent());
  }

  openForms() {
    const dialogRef = this.dialog.open(DynamicFormModalComponent, {
      width: '500px'
    });
    dialogRef.componentInstance.questions = this.getQuestions();
    dialogRef.componentInstance.clearOnDestroy = this.checked;
    dialogRef.componentInstance.outputEvent.subscribe((value: any) => {
      this.saveAsDraft(value);
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getQuestions() {
    let questions: QuestionBase<string>[] = [
      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' }
        ],
        order: 3
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return questions.sort((a, b) => a.order - b.order);
  }

  saveAsDraft(draft) {
    this.store.dispatch(new SaveToDraft(draft));
  }

  fillForm(value) {
    this.store.dispatch(new SetFormsGroup(value.model));
    const dialogRef = this.dialog.open(DynamicFormModalComponent, {
      width: '500px'
    });
    dialogRef.componentInstance.questions = this.getQuestions();
    dialogRef.componentInstance.clearOnDestroy = this.checked;
    dialogRef.componentInstance.outputEvent.subscribe((value: any) => {
      this.saveAsDraft(value);
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  helpChange(value) {
    this.store.dispatch(new SetHelpContent(value));
  }
}
