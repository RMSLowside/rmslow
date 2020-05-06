import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { MatDialog } from '@angular/material/dialog';
import { CreateRuleModalComponent } from '@rms-frontend/create-rule-modal';

@Component({
  selector: 'rules-engine-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  constructor(public store: Store, public dialog: MatDialog) { }

  createRule() {
    console.log("Creating new rule");
    const dialogRef = this.dialog.open(CreateRuleModalComponent,
      {
        id: 'create-rule-modal',
        hasBackdrop: false,
        minWidth: '80%',
        width: '80%',
        minHeight: '90%',
        height: '90%'
      });
    dialogRef.afterClosed().subscribe(res => {
      console.log('New Rule Closed');
    });
  }

  orderRules() {
    console.log("Ordering rules");
  }
}
