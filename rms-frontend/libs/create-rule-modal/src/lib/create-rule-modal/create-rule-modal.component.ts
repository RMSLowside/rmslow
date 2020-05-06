import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'rms-frontend-create-rule-modal',
  templateUrl: './create-rule-modal.component.html',
  styleUrls: ['./create-rule-modal.component.scss']
})
export class CreateRuleModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateRuleModalComponent>,public dialog: MatDialog) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void { }

}
