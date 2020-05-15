import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreModule } from '@rms-frontend/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, FormArray, FormBuilder, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { TextAddModalComponent } from '@rms-frontend/text-add-modal';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
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
        conditionValueHidden: '',
        order: ''
      }))
    } else {
      this.items.push(this.formBuilder.group({
        actionName: '',
        actionValue: '',
        actionValueHidden: '',
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
        conditionValue: '',
        conditionValueHidden: ''
      }))
    } else {
      this.items.insert(index + 1, this.formBuilder.group({
        actionName: '',
        actionValue: '',
        actionValueHidden: '',
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

  getAction(index) {
    return this.form.get('items').get(index.toString()).get('actionName').value;
  }

  conditionChanged(event, index) {
    this.form.get('items').get(index.toString()).get('conditionComparator').setValue("");
    this.form.get('items').get(index.toString()).get('conditionValue').setValue("");
  }

  getOptions(index, type){
    let selectName = "";
    if(type == "condition"){
      selectName = this.form.get('items').get(index.toString()).get('conditionName').value.value;
    } else if(type == "action"){
      selectName = this.form.get('items').get(index.toString()).get('actionName').value;
    }
    switch(selectName) {
      case "producer": {
        return ["System 1", "System 2"];
      }
      case "transfer": {
        return ["System 1", "System 2"];
      }
      case "rmm": {
         return ["FRCS-1", "FRCS-2", "FRCS-3"];
      }
      default: {
        return [];
      }
    }
  }

  openMultiAddModal(index, type) {
    let valueString = "";
    let valueHiddenString = "";
    if(type == "condition"){
      valueString = "conditionValue";
      valueHiddenString = "conditionValueHidden";
    } else if(type == "action") {
      valueString = "actionValue";
      valueHiddenString = "actionValueHidden";
    }

    let input = this.form.get('items').get(index.toString()).get(valueHiddenString).value || [];

    const dialogRef = this.dialog.open(TextAddModalComponent,
    {
      id: 'text-add-modal',
      hasBackdrop: false,
      minWidth: '20%',
      width: '20%',
      minHeight: '50%',
      height: '50%'
    });
    dialogRef.componentInstance.contents = input;
    dialogRef.componentInstance.contentSaved.subscribe((values: any) => {
      this.currentValue
      var stringValue = "";
      for (var value of values) {
          stringValue = stringValue + value.textValue + ", "
      }

      this.form.get('items').get(index.toString()).get(valueString).setValue(stringValue.substring(0, stringValue.length - 2));
      this.form.get('items').get(index.toString()).get(valueHiddenString).setValue(values);
    });
    dialogRef.afterClosed().subscribe(res => {});
  }
}
