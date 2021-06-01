import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './components/grid/grid.component';
import { MapOneComponent } from './components/map-one/map-one.component';

const routes: Routes = [
  { path: '', component: GridComponent },
  { path: '1', component: MapOneComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
