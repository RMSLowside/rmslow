import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RangeComponent } from './range.component';

const routes: Routes = [{ path: '', component: RangeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RangeRoutingModule {}
