import { Component, EventEmitter, OnInit, Input, Output, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'rms-frontend-order-rules-modal',
  templateUrl: './order-rules-modal.component.html',
  styleUrls: ['./order-rules-modal.component.scss']
})
export class OrderRulesModalComponent implements OnInit {
  @Input() contents = [];
  @Output() contentChange: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  items: FormArray;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, public dialogRef: MatDialogRef<OrderRulesModalComponent>) {
    this.form = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.items = this.form.get('items') as FormArray;
    this.items.push(this.formBuilder.group({
      ruleId: '53',
      ruleDescription: 'When text contains ELEMENT',
      order: 1
    }));
    this.items.push(this.formBuilder.group({
      ruleId: '43',
      ruleDescription: 'When producer is amazon. This rule is applied',
      order: 2
    }));
    this.items.push(this.formBuilder.group({
      ruleId: '101',
      ruleDescription: 'When producer is google.',
      order: 3
    }));
    this.items.push(this.formBuilder.group({
      ruleId: '99',
      ruleDescription: 'When conditions are met. Do things',
      order: 4
    }));
    this.items.push(this.formBuilder.group({
      ruleId: '1',
      ruleDescription: 'These files fo not matter',
      order: 5
    }));
    this.items.push(this.formBuilder.group({
      ruleId: '11',
      ruleDescription: 'Default Rule for System X',
      order: 5
    }));

    this.form.valueChanges.subscribe(x => {
      this.contents = this.reorder(x.items);
      this.contentChange.emit(this.contents);
    });
  }

  ngAfterViewInit(): void {

  }

  drop(event: CdkDragDrop<string[]>) {
    const item = this.items.at(event.previousIndex);
    this.items.removeAt(event.previousIndex);
    this.items.insert(event.currentIndex, item);
  }

  moveUp(index) {
    this.items = this.form.get('items') as FormArray;
    if(index > 0){
      const item = this.items.at(index);
      this.items.removeAt(index);
      this.items.insert(index - 1, item);
    }
  }

  moveDown(index) {
    this.items = this.form.get('items') as FormArray;
    if (this.items.controls.length != length) {
      const item = this.items.at(index);
      this.items.removeAt(index);
      this.items.insert(index + 1, item);
    }
  }

  reorder(values) {
    return values.map((item, index) => {
      item.order = index + 1;
      return item;
    })
  }

  saveOrder() {
    console.log("Actual save the information one day");
    this.dialogRef.close();
  }
}
