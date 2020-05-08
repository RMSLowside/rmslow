import { Component, OnInit } from '@angular/core';
import { HistoryState } from '../../+state/history/history.state';
import { VersionHistory } from '@rms-frontend/version-history';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HistoryAction } from '../../+state/history/history.actions';
import { MatDialog } from '@angular/material/dialog';
import { HistoryModalComponent } from '@rms-frontend/version-history';

@Component({
  selector: 'lazy-load-route-two',
  templateUrl: './route-two.component.html',
  styleUrls: ['./route-two.component.css']
})
export class RouteTwoComponent implements OnInit {
  @Select(HistoryState.getHistories) histories$: Observable<VersionHistory[]>;

  constructor(public store: Store, public dialog: MatDialog) {}

  ngOnInit(): void {
    const intialHistories: VersionHistory[] = [];
    if (
      this.store.selectSnapshot(state => state.history?.histories.length) === 0
    ) {
      for (let i = 0; i < 10; i++) {
        const history = new VersionHistory();
        history.date = new Date();
        history.date.setDate(history.date.getDate() - (10 - i));
        history.field = i % 2 === 0 ? 'fieldOne' : 'fieldTwo';

        history.oldValue = i > 1 ? intialHistories[i - 2].newValue : 'None';
        history.user = i % 2 === 0 ? 'Steve' : 'Bryan';
        history.version = Math.floor((i + 2) / 2);
        history.newValue = `This is the ${history.version} entry for ${history.field}`;
        intialHistories.push(history);
      }
      this.store.dispatch(new HistoryAction(intialHistories));
    }
  }
  openHistory() {
    const dialogRef = this.dialog.open(HistoryModalComponent);
    dialogRef.componentInstance.histories = this.histories$;
    dialogRef.componentInstance.canEdit = true;
    dialogRef.afterClosed().subscribe(res => {});
  }
}
