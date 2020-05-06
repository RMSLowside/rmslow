import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { HelpEditComponent } from '../help-edit/help-edit.component';

@Component({
  selector: 'rms-frontend-help-modal',
  templateUrl: './help-modal.component.html',
  styleUrls: ['./help-modal.component.scss']
})
export class HelpModalComponent implements OnInit {
  @Input() title: string = 'Help Modal';
  @Input() contents: any = [];
  @Input() isEditor: boolean = true;
  @Output() updateHelpContent: EventEmitter<any> = new EventEmitter<any>();

  loading: boolean = true;
  editMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<HelpModalComponent>,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.contents.length > 0)
      this.contents = this.contents.sort((a, b) => a.order - b.order)
  }

  ngAfterViewInit(): void {
    this.loading = false;
  }

  goToPage(link) {    
    window.location.href = link;
  }

  OpenHelpEditor() {
    this.editMode = true;
  }

  updateContent() {    
    this.editMode = false;
    this.updateHelpContent.emit(this.contents);
  }

  contentChanged(contents) {    
    this.contents = contents;
  }
}
