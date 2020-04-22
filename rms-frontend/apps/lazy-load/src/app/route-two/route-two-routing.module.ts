import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteTwoComponent } from './route-two/route-two.component';

const routes: Routes = [{ path: '', component: RouteTwoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RouteTwoRoutingModule {}
