import { Component, OnInit, Input, NgModule } from '@angular/core';
import { CoreModule } from '@rms-frontend/core';
import { FormControl, FormGroup, FormBuilder, Validator, Validators,ReactiveFormsModule } from "@angular/forms";
import { RulesMessage } from "../models/rules-message";

@Component({
  selector: 'rms-frontend-test-rule',
  templateUrl: './test-rule.component.html',
  styleUrls: ['./test-rule.component.scss']
})
export class TestRuleComponent implements OnInit {

  searchForm: FormGroup;
  jsonForm: FormGroup;
  rulesMessage: RulesMessage = new RulesMessage();
  testRan: boolean = false;
  matched: boolean = false;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.jsonForm = this.formBuilder.group({
      guide: '',
      producer: '',
      createdate: '',
      text: '',
      title: ''
    });

    this.rulesMessage.guide = "";
    this.rulesMessage.producer = "";
    this.rulesMessage.createDate = "";
    this.rulesMessage.text = "";
    this.rulesMessage.title = "";

    this.onChanges();
  }

  onChanges(): void {
    this.jsonForm.valueChanges.subscribe(val => {
      this.rulesMessage.guide = val.guide;
      this.rulesMessage.producer = val.producer;
      this.rulesMessage.createDate = val.createdate;
      this.rulesMessage.text = val.text;
      this.rulesMessage.title = val.title;
    });
  }

  searchGuide(searchText): void {
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
    this.matched = Math.random() >= 0.5;
    this.testRan = true;
  }
}
