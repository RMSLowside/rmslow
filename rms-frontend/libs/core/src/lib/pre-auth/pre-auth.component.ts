import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Login } from '../+state/auth/auth.actions';

@Component({
  selector: 'rms-pre-auth',
  templateUrl: './pre-auth.component.html',
  styleUrls: ['./pre-auth.component.scss']
})
export class PreAuthComponent implements OnInit {
  constructor(public store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new Login());
  }
}
