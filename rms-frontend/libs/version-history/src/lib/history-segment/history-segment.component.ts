import { Component, Input, Output, EventEmitter } from '@angular/core';
import { VersionHistory } from '../version-history';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogModel,
  ConfirmationModalComponent
} from '@rms-frontend/confirmation-modal';

@Component({
  selector: 'rms-frontend-history-segment',
  templateUrl: './history-segment.component.html',
  styleUrls: ['./history-segment.component.scss']
})
export class HistorySegmentComponent {
  constructor(public dialog: MatDialog) {}
  @Input() histories: VersionHistory[];
  @Input() canEdit: boolean;
  @Output() revertChange = new EventEmitter<VersionHistory[]>();

  emit(histories) {
    this.revertChange.emit(histories);
  }
  trackByIndex(index) {
    return index;
  }
  confirmDialog(histories: VersionHistory[]): void {
    let message = `You are about to revert `;
    histories.forEach((his, index) => {
      message += `<strong>${his.field}</strong> to ${his.oldValue ||
        '<em>Blank</em>'} `;
      if (index != histories.length - 1) message += 'and ';
    });
    message += '. Do you want to continue?';

    const dialogData = new ConfirmDialogModel('Confirm Revert', message);

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) this.emit(histories);
    });
  }
}
