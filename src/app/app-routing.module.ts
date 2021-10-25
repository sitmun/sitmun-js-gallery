import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './components/grid/grid.component';
import { MapOneComponent } from './components/map-one/map-one.component';
import { MapTwoComponent } from './components/map-two/map-two.component';
import { SelectorComponent } from './components/selector/selector.component';
import { ZoomComponent } from './components/zoom/zoom.component';
import { PanComponent } from './components/pan/pan.component';
import { MapBackComponent } from './components/map-back/map-back.component';
import { MapCapesComponent } from './components/map-capes/map-capes.component';

const routes: Routes = [
  { path: '', component: GridComponent },
  { path: '1', component: MapOneComponent },
  { path: '2', component: MapTwoComponent },
  { path: 'select', component: SelectorComponent},
  { path: 'zoom', component: ZoomComponent },
  { path: 'pan', component: PanComponent },
  { path: 'background', component: MapBackComponent },
  { path: 'capes', component: MapCapesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
