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
import {get as GetProjection} from 'ol/proj';
import {fromLonLat} from 'ol/proj';



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
    proj4.defs(
      'EPSG:25831',
      '+proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs'
    );
    register(proj4);
    // Mirar dependencies
    await this.SitmunJsClient.workspaceApplication(1, 41).then((data) => {
      this.centreX = data.territory.center.x;
      this.centreY = data.territory.center.y;
      this.minX = data.territory.extent.minX;
      this.maxX = data.territory.extent.maxX;
      this.minY = data.territory.extent.minY;
      this.maxY = data.territory.extent.maxY;
      console.log(this.centreX, this.centreY, this.minX, this.maxX, this.minY, this.maxY);
    });
    const myProjection = new Projection({
      code: 'EPSG:25831',
      extent: [this.minX, this.maxX, this.minY, this.maxY]
    });
    const extent = [this.minX, this.maxX, this.minY, this.maxY];

    const myLayers = [
      new TileLayer({
        extent: extent,
        source: new OSM(),
      }),
      new ImageLayer({
        extent: extent,
        source: new ImageWMS({
          url: 'http://sitmun.diba.cat/wms/servlet/CAE1M',
          crossOrigin: 'anonymous',
          serverType: 'mapserver',
          projection: myProjection,
          params: {'LAYERS': 'MTE50_Disponibilitat'},
        }),
      })
    ];

    this.map = new Map({
      controls: [],
      layers: myLayers,
      target: 'map',
      view: new View({
        projection: myProjection,
        extent: extent,
        center: [this.centreX, this.centreY],
        zoom: 10,
      })
    });
  }

}
