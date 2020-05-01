import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'rms-frontend-help-edit',
  templateUrl: './help-edit.component.html',
  styleUrls: ['./help-edit.component.scss']
})
export class HelpEditComponent implements OnInit {
  @Input() contents = [];
  @Output() contentChange: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
  items: FormArray;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      items: this.formBuilder.array([])
    });

    this.items = this.form.get('items') as FormArray;

    if (this.contents.length > 0)
      this.contents.forEach(item => {
        this.items.push(this.formBuilder.group({
          type: new FormControl(item.type || 'text'),
          title: new FormControl(item.title || ''),
          value: new FormControl(item.value || ''),
          order: new FormControl(item.order)
        }));
      });
    else
      this.items.push(this.formBuilder.group({
        type: 'text',
        title: '',
        value: '',
        order: ''
      }))

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
    this.items.insert(index + 1, this.formBuilder.group({
      type: 'text',
      title: '',
      value: '',
      order: ''
    }))
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
