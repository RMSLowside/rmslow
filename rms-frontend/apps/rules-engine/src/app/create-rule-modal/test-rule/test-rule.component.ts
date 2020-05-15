import { Component, OnInit, Input, NgModule } from '@angular/core';
import { CoreModule } from '@rms-frontend/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RulesMessage } from "../models/rules-message";

export interface RuleResult {
  guide: string;
  status: string;
}

@Component({
  selector: 'rms-frontend-test-rule',
  templateUrl: './test-rule.component.html',
  styleUrls: ['./test-rule.component.scss']
})
export class TestRuleComponent implements OnInit {

  form: FormGroup;
  items: FormArray;

  searchForm: FormGroup;
  jsonForm: FormGroup;
  rulesMessage: RulesMessage = new RulesMessage();
  ranSearch: boolean = false;
  guideSelected: boolean = false;

  displayedColumns: string[] = ['guide', 'status'];
  dataSource: RuleResult[];

  constructor(private formBuilder: FormBuilder) {
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
    let data: RuleResult[] = [];
    for (let c of this.items.controls) {
      var guide = c.value.guideValue;
      if(guide != ""){
        var matched = Math.random() >= 0.5?'matched':'unmatched';
        data.push({
          guide: guide,
          status: matched
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
  }
}
