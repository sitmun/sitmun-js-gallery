import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import ImageWMS from 'ol/source/ImageWMS';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import Projection from 'ol/proj/Projection';
import { Image as ImageLayer, Tile as TileLayer } from 'ol/layer';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import SitmunJS from '@sitmun/sitmun-js';

// Mirar dependencies
proj4.defs(
  'EPSG:25381'
);

register(proj4);

@Component({
  selector: 'app-map-two',
  templateUrl: './map-two.component.html',
  styleUrls: ['./map-two.component.css']
})
export class MapTwoComponent implements OnInit {

  map: Map;
  SitmunJsClient = new SitmunJS({ basePath: 'https://sitmun-backend-core.herokuapp.com/' });
  centreX: number;
  centreY: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;

  constructor(){}

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    await this.SitmunJsClient.workspaceApplication(1, 41).then((data) => {
      this.centreX = data.territory.center.x;
      this.centreY = data.territory.center.y;
      this.minX = data.territory.extent.minX;
      this.maxX = data.territory.extent.maxX;
      this.minY = data.territory.extent.minY;
      this.maxY = data.territory.extent.maxY;
      console.log(this.centreX, this.centreY, this.minX, this.maxX, this.minY, this.maxY);
    });

    const layers = [
      new TileLayer({
        source: new OSM(),
      }),
      new ImageLayer({
        extent: [this.minX, this.maxX, this.minY, this.maxY],
        source: new ImageWMS({
          url: 'http://sitmun.diba.cat/wms/servlet/CAE1M'
        }),
      })
    ];

    const projection = new Projection({
      code: 'EPSG:25831',
      units: 'm'
    });

    this.map = new Map({
      controls: [],
      view: new View({
        projection: projection,
        center: [this.centreY, this.centreX],
        zoom: 8
      }),
      target: 'map',
      layers: layers
    });
  }

}
