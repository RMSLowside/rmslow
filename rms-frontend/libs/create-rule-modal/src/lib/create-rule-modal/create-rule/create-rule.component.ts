import { Component, EventEmitter, OnInit, Input, Output, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CoreModule } from '@rms-frontend/core';
import { RuleBuildPieceComponent } from '../rule-build-piece/rule-build-piece.component';

@Component({
  selector: 'rms-frontend-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.scss']
})
export class CreateRuleComponent implements OnInit {
  @Input() name: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateRuleComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  saveForm(): void {
    console.log("Actual save the information one day");
    this.dialogRef.close();
  }
}
