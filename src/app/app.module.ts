import { DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { ScalelineComponent } from './components/scaleline/scaleline.component';
import { MousePositionComponent } from './components/mouse-position/mouse-position.component';
import { GridComponent } from './components/grid/grid.component';
import { AppRoutingModule } from './app-routing.module';
import { MapOneComponent } from './components/map-one/map-one.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapTwoComponent } from './components/map-two/map-two.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { SelectorComponent } from './components/selector/selector.component';
import { ZoomComponent } from './components/zoom/zoom.component';
import { PanComponent } from './components/pan/pan.component';
import { MapBackComponent } from './components/map-back/map-back.component';
import { MapCapesComponent } from './components/map-capes/map-capes.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { AltresFormatsComponent } from './components/altres-formats/altres-formats.component';
import { WfsComponent } from './components/wfs/wfs.component';
import { GeojsonComponent } from './components/geojson/geojson.component';
import { KmlComponent } from './components/kml/kml.component';
import { GmlComponent } from './components/gml/gml.component';
import { ShapeFileComponent } from './components/shape-file/shape-file.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ScalelineComponent,
    MousePositionComponent,
    GridComponent,
    MapOneComponent,
    HeaderComponent,
    FooterComponent,
    MapTwoComponent,
    SelectorComponent,
    ZoomComponent,
    PanComponent,
    MapBackComponent,
    MapCapesComponent,
    AltresFormatsComponent,
    WfsComponent,
    GeojsonComponent,
    KmlComponent,
    GmlComponent,
    ShapeFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSliderModule
  ],
  providers: [DecimalPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
