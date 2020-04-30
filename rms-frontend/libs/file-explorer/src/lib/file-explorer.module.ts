import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@rms-frontend/core';
import { FileExplorerComponent } from './file-explorer/file-explorer.component';
import { RenameModalComponent } from './rename-modal/rename-modal.component';
import { NewFolderModalComponent } from './new-folder-modal/new-folder-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropModule } from 'ngx-file-drop';
import { OrderByPipe } from '@rms-frontend/core';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule
  ],
  declarations: [
    FileExplorerComponent,
    RenameModalComponent,
    NewFolderModalComponent,
    OrderByPipe
  ],
  exports: [FileExplorerComponent]
})
export class FileExplorerModule {}
