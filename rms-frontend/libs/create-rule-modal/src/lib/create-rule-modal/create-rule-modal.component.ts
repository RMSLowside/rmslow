import { Component, EventEmitter, OnInit, Input, Output, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CreateRuleComponent } from './create-rule/create-rule.component';
import { TestRuleComponent } from './test-rule/test-rule.component';
import { RuleBuildPieceComponent } from './rule-build-piece/rule-build-piece.component';

@Component({
  selector: 'rms-frontend-create-rule-modal',
  templateUrl: './create-rule-modal.component.html',
  styleUrls: ['./create-rule-modal.component.scss']
})
export class CreateRuleModalComponent implements OnInit {

  @ViewChild('createRule', { read: ViewContainerRef }) createRule: ViewContainerRef;
  @ViewChild('testRule', { read: ViewContainerRef }) testRule: ViewContainerRef;

  createRuleRef: ComponentRef<CreateRuleComponent>;
  testRuleRef: ComponentRef<TestRuleComponent>;

  constructor(public dialogRef: MatDialogRef<CreateRuleModalComponent>, public dialog: MatDialog, private cfr: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.lazyLoadCreateRule();
  }

  ngAfterViewInit(): void { }

  async lazyLoadCreateRule() {
    const { CreateRuleComponent } = await import(
      './create-rule/create-rule.component'
    );
    const factory = this.cfr.resolveComponentFactory(CreateRuleComponent);
    this.createRuleRef = this.createRule.createComponent(factory);
    this.createRuleRef.hostView.detectChanges();
  }

  async lazyLoadTestRule() {
    const { TestRuleComponent } = await import(
      './test-rule/test-rule.component'
    );
    const factory = this.cfr.resolveComponentFactory(TestRuleComponent);
    this.testRuleRef = this.testRule.createComponent(factory);
    this.testRuleRef.hostView.detectChanges();
  }

  tabSelectionChanged(event) {
    const selectedTabName = event.tab.textLabel;

    switch (selectedTabName) {
      case 'Create Rule':
        this.lazyLoadCreateRule();
        break;
      case 'Test Rule':
        this.lazyLoadTestRule();
        break;
    }
  }
}
