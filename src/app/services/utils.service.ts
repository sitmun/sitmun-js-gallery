import {Injectable} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import ImageWMS from 'ol/source/ImageWMS';
import OSM from 'ol/source/OSM';
import Projection from 'ol/proj/Projection';
import {Image as ImageLayer, Tile as TileLayer} from 'ol/layer';
import {transform} from 'ol/proj';
import { defaults as defaultInteractions } from 'ol/interaction';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }
  myCenter: any;
  workspaceApp = {
    id: 41,
    center: {
      x: 449372,
      y: 4601581.5
    },
    extent: {
      minX: 446439,
      minY: 452305,
      maxX: 4597923,
      maxY: 4605240
    },
    zoom: 13,
    epsg: 'EPSG:25831',
    roles: [
      {
        id: 0,
        name: 'admin',
        tasks: [
          {
            id: 1,
            nom: 'zoom'
          }
        ]
      }
    ]
  };

  getMyLayers(): any {
    return [
      new TileLayer({
        source: new OSM()
      }),
      new ImageLayer({
        source: new ImageWMS({
          url: 'http://sitmun.diba.cat/wms/servlet/CAE1M',
          crossOrigin: 'anonymous',
          serverType: 'mapserver',
          projection: this.getProjection(),
          params: {'LAYERS': 'MTE50_Disponibilitat,CAE1M_141A,CAE1M_112L_FF,CAE1M_122P_FF,CAE1M_123P_FF'},
        }),
      })
    ];
  }

  getMap(): any {
    return new Map({
      controls: [],
      interactions: defaultInteractions({
        doubleClickZoom: false,
        keyboardZoom: false,
        mouseWheelZoom: false,
        dragPan: false
      }),
      layers: this.getMyLayers(),
      target: 'map',
      view: new View({
        projection: 'EPSG:3857',
        center: this.getCentre('EPSG:25831'),
        zoom: this.getDefaultZoom()
      })
    });
  }

  getDefaultZoom(): number {
    return this.workspaceApp.zoom;
  }

  getCentre(epsgOrig: string): number[] {
    const myCenter = [this.workspaceApp.center.x, this.workspaceApp.center.y];
    return transform(myCenter, epsgOrig, 'EPSG:3857');
  }

  getExtent(): number[]{
    return [this.workspaceApp.extent.minX, this.workspaceApp.extent.minY, this.workspaceApp.extent.maxX, this.workspaceApp.extent.maxY];
  }

  getProjection(): any {
    return new Projection({
      code: this.workspaceApp.epsg,
      extent: this.getExtent()
    });
  }

  hasZoomTask(): boolean {
    return true;
  }

  hasPanTask(): boolean {
    return true;
  }

}
