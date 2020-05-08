import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { MatDialog } from '@angular/material/dialog';
import { CreateRuleModalComponent } from '@rms-frontend/create-rule-modal';
import { OrderRulesModalComponent } from '@rms-frontend/order-rules-modal';
import { GridComponent } from '@rms-frontend/grid';

@Component({
  selector: 'rules-engine-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  gridColumns = ['Priority', 'ID', 'RecordSystemGUIDE', 'Description', 'Rule'];
  gridData = [
    { Priority: '5', ID: '53', RecordSystemGUIDE: 'guide://1234-1234', Description: 'When text contains ELEMENT', Rule: 'Conditions:<br><li>Content CONTAINS element</li>Actions:<br><li>Apply RCS-1' },
    { Priority: '4', ID: '43', RecordSystemGUIDE: 'guide://1234-1234', Description: 'When producer is amazon. This rule is applied', Rule: 'Conditions:<br><li>Producer = amazon</li>Actions:<br><li>Apply RCS-13<li>Send To Email help@aws.com<li>Send To System Y' },
    { Priority: '3', ID: '101', RecordSystemGUIDE: 'guide://1234-1234', Description: 'When producer is google. This rule is applied', Rule: 'Conditions:<br><li>Producer = google</li><li>CrateDate < 2020-01-01</li>Actions:<br><li>Apply RCS-74' },
    { Priority: '2', ID: '99', RecordSystemGUIDE: 'guide://1234-1234', Description: 'When conditions are met. Do things', Rule: 'Conditions:<br><li>CreateDate > 2020-01-02</li>Actions:<br><li>Send To System Z' },
    { Priority: '1', ID: '1', RecordSystemGUIDE: 'guide://1234-1234', Description: 'These files fo not matter', Rule: 'Conditions:<br><li>Title CONTAINS "Junk Mail"</li>Actions:<br><li>Drop' },
    { Priority: 'DEFAULT', ID: '11', RecordSystemGUIDE: 'guide://1234-1234', Description: 'Default Rule for System X', Rule: 'Actions:<li>Apply RCS 8' },
  ];

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  constructor(public store: Store, public dialog: MatDialog) { }

  createRule() {
    console.log("Creating new rule");
    const dialogRef = this.dialog.open(CreateRuleModalComponent,
      {
        id: 'create-rule-modal',
        hasBackdrop: false,
        minWidth: '90%',
        width: '90%',
        minHeight: '90%',
        height: '90%'
      });
    dialogRef.afterClosed().subscribe(res => {
      console.log('New Rule Closed');
    });
  }

  orderRules() {
    console.log("Ordering rules");
    const dialogRef = this.dialog.open(OrderRulesModalComponent,
      {
        id: 'order-rules-modal',
        hasBackdrop: false,
        minWidth: '90%',
        width: '90%',
        minHeight: '90%',
        height: '90%'
      });
    dialogRef.afterClosed().subscribe(res => {
      console.log('New Rule Closed');
    });
  }

  testRules() {
    console.log("Testing rules")
  }
}
