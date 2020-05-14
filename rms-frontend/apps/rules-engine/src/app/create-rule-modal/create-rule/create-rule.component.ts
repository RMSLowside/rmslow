import { Component, EventEmitter, OnInit, Input, Output, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef, NgModule } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CoreModule } from '@rms-frontend/core';
import { RuleBuildPieceComponent } from '../rule-build-piece/rule-build-piece.component';
import { RulesState } from '../../+state/rules.state';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { updateRulesText } from '../../+state/rules.actions';
import { RulesService } from '../../rules.service';

@Component({
  selector: 'rms-frontend-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.scss']
})
export class CreateRuleComponent implements OnInit {
  @Input() name: string = '';
  @Select(RulesState.rulesText) rulesText$: Observable<string>;

  conditions = [];
  actions = [];
  service: RulesService;

  constructor(
    public dialogRef: MatDialogRef<CreateRuleComponent>,
    public store: Store,
    service: RulesService
  ) {
    this.service = service;
  }

  ngOnInit(): void {
    this.updateString();
  }

  saveForm(): void {
    console.log("Actual save the information one day");
    this.dialogRef.close();
  }

  setConditionState(event): void {
    console.log("A Condition changed");
    this.conditions = event;
    this.updateString();
  }

  setActionState(event): void {
    console.log("A Action changed");
    this.actions = event;
    this.updateString();
  }

  updateString(): void {
     this.store.dispatch(new updateRulesText(this.service.buildRulesText(this.conditions, this.actions)));
  }
}
