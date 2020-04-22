import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, UnauthComponent } from '@rms-frontend/core';

const routes: Routes = [
  {
    path: 'home',
    canLoad: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'routeTwo',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./route-two/route-two.module').then(m => m.RouteTwoModule)
  },
  { path: 'unauth', component: UnauthComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
