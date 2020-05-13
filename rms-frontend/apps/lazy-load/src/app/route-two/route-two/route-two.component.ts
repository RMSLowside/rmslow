import { Component, OnInit } from '@angular/core';
import { HistoryState } from '../../+state/history/history.state';
import { VersionHistory } from '@rms-frontend/version-history';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  HistoryAction,
  AddHistory
} from '../../+state/history/history.actions';
import { MatDialog } from '@angular/material/dialog';
import { HistoryModalComponent } from '@rms-frontend/version-history';
import {
  DynamicFormModalComponent,
  QuestionBase,
  DropdownQuestion,
  TextboxQuestion
} from '@rms-frontend/forms';
import * as _ from 'lodash';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lazy-load-route-two',
  templateUrl: './route-two.component.html',
  styleUrls: ['./route-two.component.css']
})
export class RouteTwoComponent implements OnInit {
  @Select(HistoryState.getHistories) histories$: Observable<VersionHistory[]>;
  userControl = new FormControl();

  constructor(public store: Store, public dialog: MatDialog) {}
  person = {
    name: '',
    description: '',
    favColor: ''
  };

  version = 0;

  ngOnInit(): void {
    this.userControl.setValue('Steve');
  }

  openHistory() {
    const dialogRef = this.dialog.open(HistoryModalComponent, {
      width: '500px'
    });
    dialogRef.componentInstance.histories = this.histories$;
    dialogRef.componentInstance.canEdit = true;
    dialogRef.componentInstance.revertChange.subscribe(
      (value: VersionHistory) => {
        const person = _.cloneDeep(this.person);
        person[value.field] = value.oldValue;
        this.onSave(person);
      }
    );
    dialogRef.afterClosed().subscribe(res => {});
  }

  openForms() {
    const dialogRef = this.dialog.open(DynamicFormModalComponent, {
      width: '500px'
    });
    dialogRef.componentInstance.questions = this.getQuestions();
    dialogRef.componentInstance.clearOnDestroy = false;
    dialogRef.componentInstance.outputEvent.subscribe((value: any) => {
      this.onSave(value);
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  getQuestions() {
    const questions: QuestionBase<string>[] = [
      new DropdownQuestion({
        key: 'favColor',
        label: 'Favorite Color',
        options: [
          { key: 'Orange', value: 'Orange' },
          { key: 'Green', value: 'Green' },
          { key: 'Blue', value: 'Blue' },
          { key: 'Red', value: 'Red' }
        ],
        value: this.person?.favColor,
        order: 3
      }),

      new TextboxQuestion({
        key: 'name',
        label: 'Name',
        value: this.person?.name,
        order: 1
      }),

      new TextboxQuestion({
        key: 'description',
        label: 'Description',
        type: 'textbox',
        value: this.person?.description,
        order: 2
      })
    ];

    return questions.sort((a, b) => a.order - b.order);
  }

  onSave(formFields) {
    const modTime = new Date();
    Object.keys(this.person).forEach(field => {
      if (formFields[field] != this.person[field]) {
        this.store.dispatch(
          new AddHistory({
            user: this.userControl.value,
            version: this.version,
            date: modTime,
            newValue: formFields[field],
            oldValue: this.person[field],
            field: field
          })
        );
        this.person[field] = formFields[field];
      }
    });
  }
}
