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
import {AltresFormatsComponent} from './components/altres-formats/altres-formats.component';
import {WfsComponent} from './components/wfs/wfs.component';
import {GeojsonComponent} from './components/geojson/geojson.component';
import {KmlComponent} from './components/kml/kml.component';
import {GmlComponent} from './components/gml/gml.component';
import {ShapeComponent} from './components/shape/shape.component';

const routes: Routes = [
  { path: '', component: GridComponent },
  { path: '1', component: MapOneComponent },
  { path: '2', component: MapTwoComponent },
  { path: 'select', component: SelectorComponent},
  { path: 'zoom', component: ZoomComponent },
  { path: 'pan', component: PanComponent },
  { path: 'background', component: MapBackComponent },
  { path: 'capes', component: MapCapesComponent },
  { path: 'altres', component: AltresFormatsComponent },
  { path: 'wfs', component: WfsComponent },
  { path: 'geojson', component: GeojsonComponent },
  { path: 'kml', component: KmlComponent },
  { path: 'gml', component: GmlComponent },
  { path: 'shape', component: ShapeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
