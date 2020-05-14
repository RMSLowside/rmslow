import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreModule } from '@rms-frontend/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, FormArray, FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';

interface ConditionSelect {
  name: string;
  value: string;
  type: string;
}

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
  public currentValue: string = null;
  items: FormArray;

  conditions: ConditionSelect[] = [
    {name: 'Create Date', value: 'createDate', type: 'date'},
    {name: 'Producer', value: 'producer', type: 'select'},
    {name: 'Title', value: 'title', type: 'text'},
    {name: 'Text Content', value: 'textContent', type: 'text'},
  ];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
        items: this.formBuilder.array([])
      });
  }

  ngOnInit(): void {
    this.items = this.form.get('items') as FormArray;

    if(this.conditionType) {
      this.items.push(this.formBuilder.group({
        conditionName: '',
        conditionComparator: '',
        conditionValue: '',
        order: ''
      }))
    } else {
      this.items.push(this.formBuilder.group({
        action: '',
        value: '',
        order: ''
      }))
    }

   this.form.valueChanges.subscribe(x => {
      this.contents = this.reorder(x.items);
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
        conditionName: '',
        conditionComparator: '',
        conditionValue: ''
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

  getType(index) {
    return this.form.get('items').get(index.toString()).get('conditionName').value.type;
  }

  conditionChanged(event, index) {
    this.form.get('items').get(index.toString()).get('conditionComparator').setValue("");
    this.form.get('items').get(index.toString()).get('conditionValue').setValue("");
  }

  getConditionOptions(index){
    let selectName = this.form.get('items').get(index.toString()).get('conditionName').value.value;
    switch(selectName) {
      case "producer": {
         return ["System 1", "System 2"];
      }
      default: {
        return [];
      }
    }
  }
}
