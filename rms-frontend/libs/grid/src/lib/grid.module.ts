import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@rms-frontend/core';
import { GridComponent } from './grid/grid.component';

@NgModule({
  imports: [
    CommonModule,
    CoreModule],
  declarations: [GridComponent],
  exports: [GridComponent]
})
export class GridModule { }
