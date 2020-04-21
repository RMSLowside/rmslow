import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorerRoutingModule } from './explorer-routing.module';
import { ExplorerComponent } from './explorer.component';
import { FileExplorerModule } from '@rms-frontend/file-explorer';
import { NgxsModule } from '@ngxs/store';
import { ExplorerState } from '../+state/file.state';

@NgModule({
  declarations: [ExplorerComponent],
  imports: [CommonModule, ExplorerRoutingModule, FileExplorerModule]
})
export class ExplorerModule {}
