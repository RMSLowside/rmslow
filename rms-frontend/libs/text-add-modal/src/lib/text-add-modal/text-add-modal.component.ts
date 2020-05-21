import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'text-add-modal',
  templateUrl: './text-add-modal.component.html',
  styleUrls: ['./text-add-modal.component.scss']
})
export class TextAddModalComponent implements OnInit {

  @Input() contents = [];
  @Output() contentSaved: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  items: FormArray;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public dialogRef: MatDialogRef<TextAddModalComponent>) {
    this.form = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.items = this.form.get('items') as FormArray;

    if (this.contents.length == 0){
      this.items.push(this.formBuilder.group({
        textValue: '',
        order: ''
      }));
    } else {
      this.contents.forEach(item => {
        this.items.push(this.formBuilder.group({
          textValue: new FormControl(item.textValue || ''),
          order: new FormControl(item.order)
        }));
      });
    }

    this.form.valueChanges.subscribe(x => {
      this.contents = this.reorder(x.items);
    });
  }

  removeTextValue(index) {
    if (this.items.controls.length > 1) {
      this.items = this.form.get('items') as FormArray;
      this.items.removeAt(index);
    }
  }

  addTextValue(index) {
    this.items = this.form.get('items') as FormArray;
    this.items.push(this.formBuilder.group({
      textValue: '',
      order: ''
    }));
  }

  reorder(values) {
    return values.map((item, index) => {
      item.order = index + 1;
      return item;
    });
  }

  save() {
    this.contentSaved.emit(this.contents);
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
