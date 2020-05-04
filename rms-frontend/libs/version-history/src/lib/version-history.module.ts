import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@rms-frontend/core';
import { HistoryListComponent } from './history-list/history-list.component';
import { HistorySegmentComponent } from './history-segment/history-segment.component';

@NgModule({
  imports: [CommonModule, CoreModule],
  declarations: [HistoryListComponent, HistorySegmentComponent],
  exports: [HistoryListComponent]
})
export class VersionHistoryModule {}
