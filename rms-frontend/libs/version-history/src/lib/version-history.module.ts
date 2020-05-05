import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@rms-frontend/core';
import { HistoryListComponent } from './history-list/history-list.component';
import { HistorySegmentComponent } from './history-segment/history-segment.component';
import { HistoryModalComponent } from './history-modal/history-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, CoreModule, ReactiveFormsModule],
  declarations: [
    HistoryListComponent,
    HistorySegmentComponent,
    HistoryModalComponent
  ],
  exports: [HistoryListComponent]
})
export class VersionHistoryModule {}
