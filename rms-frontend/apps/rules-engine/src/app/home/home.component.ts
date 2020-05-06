import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'rules-engine-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  ngOnInit(): void { }

  ngOnDestroy(): void { }

  constructor(public store: Store) { }

  createRule() {
    console.log("Creating new rule");
  }

  orderRules() {
    console.log("Ordering rules");
  }
}
