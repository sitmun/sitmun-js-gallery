import {Injectable} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import ImageWMS from 'ol/source/ImageWMS';
import OSM from 'ol/source/OSM';
import Projection from 'ol/proj/Projection';
import {Image as ImageLayer, Tile as TileLayer} from 'ol/layer';
import {transform} from 'ol/proj';
import { defaults as defaultInteractions } from 'ol/interaction';
import {transformExtent} from 'ol/proj';

interface Mapa {
  id: number;
  nom: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }
  workspaceApp = {
    id: 41,
    name: 'Argentona',
    extent: {
      minX: 446439,
      minY: 452305,
      maxX: 4597923,
      maxY: 4605240
    },
    center: {
      x: 449372,
      y: 4601581.5
    },
    zoom: 14,
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
    ],
    application: {
      id: 1,
      backgrounds: [
        {
          id: 0,
          name: 'OSM'
        },
        {
          id: 1,
          name: 'CAE'
        },
        {
          id: 2,
          name: 'BUE'
        }
      ]
    }
  };

  getMyLayers(): any {
    return [
      new TileLayer({
        source: new OSM()
      }),
      new ImageLayer({
        source: new ImageWMS({
          url: 'http://sitmun.diba.cat/wms/servlet/CAE1M',
          projection: this.getProjection(),
          params: {'LAYERS': 'MTE50_Disponibilitat,CAE1M_141A,CAE1M_112L_FF,CAE1M_122P_FF,CAE1M_123P_FF'},
        }),
      })
    ];
  }

  getMyView(): any {
    return new View({
      projection: 'EPSG:3857',
      center: this.getCentre('EPSG:25831'),
      zoom: this.getDefaultZoom()
    });
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
      view: this.getMyView()
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
    // tslint:disable-next-line:max-line-length
    const myExtent = [this.workspaceApp.extent.minX, this.workspaceApp.extent.minY, this.workspaceApp.extent.maxX, this.workspaceApp.extent.maxY];
    return transformExtent(myExtent, 'EPSG:25831', 'EPSG:3857');
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

  // PER FER LA GESTIÓ DE FONS

  readBackgroundMaps(): Mapa[]{
    const mapes: Mapa[] = [];
    for (const i of this.workspaceApp.application.backgrounds){
      const m: Mapa = {id: i.id, nom: i.name};
      mapes.push(m);
    }
    console.log(mapes);
    return mapes;
  }

  getMyLayers2(): any {
    return [
      new TileLayer({
        source: new OSM(),
        opacity: 0.75
      }),
      new ImageLayer({
        source: new ImageWMS({
          url: 'https://sitmun.diba.cat/wms/servlet/BUE1M',
          projection: this.getProjection(),
          params: {'LAYERS': 'BUE1M_412A_Z,BUE1M_221A,BUE1M_211A,BUE1M_211L,BUE1M_211P,BUE1M_111L,BUE1M_111P,BUE1M_111T,BUE1M_311T'}
        })
      }),
      new ImageLayer({
        source: new ImageWMS({
          url: 'http://sitmun.diba.cat/wms/servlet/CAE1M',
          projection: this.getProjection(),
          params: {'LAYERS': 'MTE50_Disponibilitat,CAE1M_141A,CAE1M_112L_FF,CAE1M_122P_FF,CAE1M_123P_FF'}
        })
      })
    ];
  }

  getMap2(): any {
    return new Map({
      controls: [],
      interactions: defaultInteractions({
        doubleClickZoom: true,
        keyboardZoom: false,
        mouseWheelZoom: true,
        dragPan: true
      }),
      layers: this.getMyLayers2(),
      target: 'map',
      view: this.getMyView()
    });
  }

  returnOSM(): any {
    return new TileLayer({
      source: new OSM(),
      opacity: 1
    });
  }

  returnBUE(): any {
    return new ImageLayer({
      source: new ImageWMS({
        url: 'https://sitmun.diba.cat/wms/servlet/BUE1M',
        projection: this.getProjection(),
        params: {'LAYERS': 'BUE1M_412A_Z,BUE1M_221A,BUE1M_211A,BUE1M_211L,BUE1M_211P,BUE1M_111L,BUE1M_111P,BUE1M_111T,BUE1M_311T'}
      })
    });
  }

  returnCAE(): any {
    return new ImageLayer({
      source: new ImageWMS({
        url: 'http://sitmun.diba.cat/wms/servlet/CAE1M',
        projection: this.getProjection(),
        params: {'LAYERS': 'MTE50_Disponibilitat,CAE1M_141A,CAE1M_112L_FF,CAE1M_122P_FF,CAE1M_123P_FF'}
      })
    });
  }

  // PER FER LA GESTIÓ DE CAPESA

}
