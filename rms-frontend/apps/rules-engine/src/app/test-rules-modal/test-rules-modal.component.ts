import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { RulesMessage } from "../models/rules-message";
import { RulesResult } from "../models/rules-result";

@Component({
  selector: 'rms-frontend-test-rules-modal',
  templateUrl: './test-rules-modal.component.html',
  styleUrls: ['./test-rules-modal.component.scss']
})
export class TestRulesModalComponent implements OnInit {

  form: FormGroup;
  items: FormArray;

  searchForm: FormGroup;
  jsonForm: FormGroup;
  rulesMessage: RulesMessage = new RulesMessage();
  ranSearch: boolean = false;
  guideSelected: boolean = false;
  currentRuleResult = "";
  currentRulesRan = "";

  displayedColumns: string[] = ['guide', 'status'];
  dataSource: RulesResult[];

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<TestRulesModalComponent>,) {
    this.form = this.formBuilder.group({
      items: this.formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.items = this.form.get('items') as FormArray;

    this.items.push(this.formBuilder.group({
      guideValue: '',
      order: ''
    }));
  }

  removeGuide(index) {
    if (this.items.controls.length > 1) {
      this.items = this.form.get('items') as FormArray;
      this.items.removeAt(index);
    }
  }

  addGuide(index) {
    this.items = this.form.get('items') as FormArray;
    this.items.push(this.formBuilder.group({
      guideValue: ''
    }));
  }

  getGuide(searchText): void {
    var guide = searchText;
    var producer = "Amazon";
    var createDate = "2019-03-24";
    var text = "This is the full text content of the document. wow so much content in here. amazing."
    var title = "COVID 19 Studies";

    this.jsonForm = this.formBuilder.group({
      guide: guide,
      producer: producer,
      createdate: createDate,
      text: text,
      title: title
    });

    this.rulesMessage.guide = guide;
    this.rulesMessage.producer = producer;
    this.rulesMessage.createDate = createDate;
    this.rulesMessage.text = text;
    this.rulesMessage.title = title;
  }

  runTest(): void {
    this.generateResults();
    this.ranSearch = true;
    this.guideSelected = false;
    this.rulesMessage = new RulesMessage();
  }

  generateResults() {
    this.items = this.form.get('items') as FormArray;
    let data: RulesResult[] = [];
    for (let c of this.items.controls) {
      var guide = c.value.guideValue;
      if(guide != ""){
        var matched = Math.random() >= 0.2?'matched rule 17':'unmatched';
        var ran = Math.round(Math.random() * 10) + 1;
        data.push({
          guide: guide,
          status: matched,
          rulesRan: ran
        });
      }
    }
    this.dataSource = [...data];
  }

  getRecord(element) {
    this.guideSelected = true;

    var guide = element.guide;
    var producer = "Amazon";
    var createDate = "2019-03-24";
    var text = "This is the full text content of the document. wow so much content in here. amazing."
    var title = "COVID 19 Studies";

    this.rulesMessage.guide = guide;
    this.rulesMessage.producer = producer;
    this.rulesMessage.createDate = createDate;
    this.rulesMessage.text = text;
    this.rulesMessage.title = title;

    this.currentRuleResult = element.status;
    this.currentRulesRan = element.rulesRan;
  }
}
