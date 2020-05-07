import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'rms-frontend-rule-build-piece',
  templateUrl: './rule-build-piece.component.html',
  styleUrls: ['./rule-build-piece.component.scss']
})
export class RuleBuildPieceComponent implements OnInit {
  @Input() contents = [];
  @Input() conditionType = true;
  @Output() contentChange: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  items: FormArray;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      items: this.formBuilder.array([])
    });

    this.items = this.form.get('items') as FormArray;

    if(this.conditionType) {
      if (this.contents.length > 0) {
        this.contents.forEach(item => {
          this.items.push(this.formBuilder.group({
            condition: new FormControl(item.condition || ''),
            comparator: new FormControl(item.comparator || ''),
            value: new FormControl(item.value || ''),
            order: new FormControl(item.order)
          }));
        });
      } else {
        this.items.push(this.formBuilder.group({
          condition: '',
          comparator: '',
          value: '',
          order: ''
        }))
      }
    } else {
      if (this.contents.length > 0) {
        this.contents.forEach(item => {
          this.items.push(this.formBuilder.group({
            action: new FormControl(item.condition || ''),
            value: new FormControl(item.comparator || ''),
            order: new FormControl(item.order)
          }));
        });
      } else {
        this.items.push(this.formBuilder.group({
          action: '',
          value: '',
          order: ''
        }))
      }
    }

    this.form.get('items').valueChanges.subscribe(x => {
      this.contents = this.reorder(x)
      this.contentChange.emit(this.contents);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    const item = this.items.at(event.previousIndex);
    this.items.removeAt(event.previousIndex);
    this.items.insert(event.currentIndex, item);
  }

  removeHelpCard(index) {
    // if there is only one item left don't delete
    if (this.items.controls.length > 1) {
      this.items = this.form.get('items') as FormArray;
      this.items.removeAt(index);
    }
  }

  addHelpCard(index) {
    this.items = this.form.get('items') as FormArray;
    if(this.conditionType) {
      this.items.insert(index + 1, this.formBuilder.group({
        condition: '',
        comparator: '',
        value: '',
        order: ''
      }))
    } else {
      this.items.insert(index + 1, this.formBuilder.group({
          action: '',
          value: '',
          order: ''
      }))
    }
  }

  reorder(values) {
    return values.map((item, index) => {
      item.order = index + 1;
      return item;
    })
  }

  emitContentChange(values) {
    this.contentChange.emit(values);
  }
}
