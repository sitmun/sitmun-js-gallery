import {Injectable} from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import ImageWMS from 'ol/source/ImageWMS';
import OSM from 'ol/source/OSM';
import KML from 'ol/format/KML';
import GeoJSON from 'ol/format/GeoJSON';
import WFS from 'ol/format/WFS';
import WMTS from 'ol/source/WMTS';
import Projection from 'ol/proj/Projection';
import { Image as ImageLayer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { transform } from 'ol/proj';
import { defaults as defaultInteractions } from 'ol/interaction';
import { transformExtent } from 'ol/proj';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import {get as getProjection} from 'ol/proj';
import {getTopLeft, getWidth} from 'ol/extent';
import XYZ from 'ol/source/XYZ';
import {bbox as bboxStrategy} from 'ol/loadingstrategy';
import Circle from 'ol/geom/Circle';
import Feature from 'ol/Feature';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import {Vector as VectorSource} from 'ol/source';

interface MapaFons {
  id: number;
  nom: string;
}

interface Capa {
  id: number;
  nom: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() {}

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
        ],
        permissions: [
          {
            members: [
              {
                id: 1,
              }
            ]
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
          params: {LAYERS: 'MTE50_Disponibilitat,CAE1M_141A,CAE1M_112L_FF,CAE1M_122P_FF,CAE1M_123P_FF'},
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

  getExtent(): number[] {
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

  readBackgroundMaps(): MapaFons[] {
    const mapes: MapaFons[] = [];
    for (const i of this.workspaceApp.application.backgrounds) {
      const m: MapaFons = {id: i.id, nom: i.name};
      mapes.push(m);
    }
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
          params: {LAYERS: 'BUE1M_412A_Z,BUE1M_221A,BUE1M_211A,BUE1M_211L,BUE1M_211P,BUE1M_111L,BUE1M_111P,BUE1M_111T,BUE1M_311T'}
        })
      }),
      new ImageLayer({
        source: new ImageWMS({
          url: 'http://sitmun.diba.cat/wms/servlet/CAE1M',
          projection: this.getProjection(),
          params: {LAYERS: 'MTE50_Disponibilitat,CAE1M_141A,CAE1M_112L_FF,CAE1M_122P_FF,CAE1M_123P_FF'}
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
        params: {LAYERS: 'BUE1M_412A_Z,BUE1M_221A,BUE1M_211A,BUE1M_211L,BUE1M_211P,BUE1M_111L,BUE1M_111P,BUE1M_111T,BUE1M_311T'}
      })
    });
  }

  returnCAE(): any {
    return new ImageLayer({
      source: new ImageWMS({
        url: 'http://sitmun.diba.cat/wms/servlet/CAE1M',
        projection: this.getProjection(),
        params: {LAYERS: 'MTE50_Disponibilitat,CAE1M_141A,CAE1M_112L_FF,CAE1M_122P_FF,CAE1M_123P_FF'}
      })
    });
  }

  // PER FER LA GESTIÓ DE CAPESA

  readLayers(): Capa[] {
    const capes: Capa[] = [];
    for (const i of this.workspaceApp.application.backgrounds) {
      const m: Capa = {id: i.id, nom: i.name};
      capes.push(m);
    }
    return capes;
  }

  // GESTIO DE CAPES COMPATIBLES

  getWMTS(): any{
    const projection = getProjection('EPSG:3857');
    const projectionExtent = projection.getExtent();
    const size = getWidth(projectionExtent) / 256;
    const resolutions = new Array(19);
    const matrixIds = new Array(19);
    for (let z = 0; z < 19; ++z) {
      resolutions[z] = size / Math.pow(2, z);
      matrixIds[z] = z;
    }
    return new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new TileLayer({
          opacity: 0.7,
          source: new WMTS({
            url: 'https://mrdata.usgs.gov/mapcache/wmts',
            layer: 'sgmc2',
            matrixSet: 'GoogleMapsCompatible',
            format: 'image/png',
            projection: getProjection('EPSG:3857'),
            tileGrid: new WMTSTileGrid({
              origin: getTopLeft(projectionExtent),
              resolutions,
              matrixIds,
            }),
            wrapX: true,
          }),
        }),
      ],
      target: 'map',
      view: new View({
        center: this.getCentre('EPSG:25831'),
        zoom: this.getDefaultZoom(),
      }),
    });
  }

  getWFS(): any{
    const vectorSource = new VectorSource({
      format: new GeoJSON(),
      // tslint:disable-next-line:typedef
      url(extent) {
        return (
          'https://ahocevar.com/geoserver/wfs?service=WFS&' +
          'version=1.1.0&request=GetFeature&typename=osm:water_areas&' +
          'outputFormat=application/json&srsname=EPSG:3857&' +
          'bbox=' +
          extent.join(',') +
          ',EPSG:3857'
        );
      },
      strategy: bboxStrategy,
    });
    const vector = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: 'rgba(0, 0, 255, 1.0)',
          width: 2,
        }),
      }),
    });
    const key = '28yG78XW8reuo3cAMW7j';
    const raster = new TileLayer({
      source: new XYZ({
        url: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=' + key,
        maxZoom: 20,
      }),
    });

    return new Map({
      layers: [raster, vector],
      target: document.getElementById('map'),
      view: new View({
        center: [-8908887.277395891, 5381918.072437216],
        maxZoom: 19,
        zoom: 12,
      }),
    });
  }

  getGeoJSON(): any {
    const image = new CircleStyle({
      radius: 5,
      fill: null,
      stroke: new Stroke({color: 'red', width: 1}),
    });

    const styles = {
      Point: new Style({
        image,
      }),
      LineString: new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
        }),
      }),
      MultiLineString: new Style({
        stroke: new Stroke({
          color: 'green',
          width: 1,
        }),
      }),
      MultiPoint: new Style({
        image,
      }),
      MultiPolygon: new Style({
        stroke: new Stroke({
          color: 'yellow',
          width: 1,
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 0, 0.1)',
        }),
      }),
      Polygon: new Style({
        stroke: new Stroke({
          color: 'blue',
          lineDash: [4],
          width: 3,
        }),
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.1)',
        }),
      }),
      GeometryCollection: new Style({
        stroke: new Stroke({
          color: 'magenta',
          width: 2,
        }),
        fill: new Fill({
          color: 'magenta',
        }),
        image: new CircleStyle({
          radius: 10,
          fill: null,
          stroke: new Stroke({
            color: 'magenta',
          }),
        }),
      }),
      Circle: new Style({
        stroke: new Stroke({
          color: 'red',
          width: 2,
        }),
        fill: new Fill({
          color: 'rgba(255,0,0,0.2)',
        }),
      }),
    };

    // tslint:disable-next-line:only-arrow-functions typedef
    const styleFunction = function(feature) {
      return styles[feature.getGeometry().getType()];
    };

    const geojsonObject = {
      type: 'FeatureCollection',
      crs: {
        type: 'name',
        properties: {
          name: 'EPSG:3857',
        },
      },
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0],
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [4e6, -2e6],
              [8e6, 2e6],
            ],
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [
              [4e6, 2e6],
              [8e6, -2e6],
            ],
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-5e6, -1e6],
                [-3e6, -1e6],
                [-4e6, 1e6],
                [-5e6, -1e6],
              ],
            ],
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'MultiLineString',
            coordinates: [
              [
                [-1e6, -7.5e5],
                [-1e6, 7.5e5],
              ],
              [
                [1e6, -7.5e5],
                [1e6, 7.5e5],
              ],
              [
                [-7.5e5, -1e6],
                [7.5e5, -1e6],
              ],
              [
                [-7.5e5, 1e6],
                [7.5e5, 1e6],
              ],
            ],
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'MultiPolygon',
            coordinates: [
              [
                [
                  [-5e6, 6e6],
                  [-3e6, 6e6],
                  [-3e6, 8e6],
                  [-5e6, 8e6],
                  [-5e6, 6e6],
                ],
              ],
              [
                [
                  [-2e6, 6e6],
                  [0, 6e6],
                  [0, 8e6],
                  [-2e6, 8e6],
                  [-2e6, 6e6],
                ],
              ],
              [
                [
                  [1e6, 6e6],
                  [3e6, 6e6],
                  [3e6, 8e6],
                  [1e6, 8e6],
                  [1e6, 6e6],
                ],
              ],
            ],
          },
        },
        {
          type: 'Feature',
          geometry: {
            type: 'GeometryCollection',
            geometries: [
              {
                type: 'LineString',
                coordinates: [
                  [-5e6, -5e6],
                  [0, -5e6],
                ],
              },
              {
                type: 'Point',
                coordinates: [4e6, -5e6],
              },
              {
                type: 'Polygon',
                coordinates: [
                  [
                    [1e6, -6e6],
                    [3e6, -6e6],
                    [2e6, -4e6],
                    [1e6, -6e6],
                  ],
                ],
              },
            ],
          },
        },
      ],
    };

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject),
    });

    vectorSource.addFeature(new Feature(new Circle([5e6, 7e6], 1e6)));

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: styleFunction,
    });

    return new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      target: 'map',
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });
  }

  getKML(): any {

    const fons = new TileLayer({
      source: new OSM()
    });

    const vector = new VectorLayer({
      source: new VectorSource({
        url: '../../assets/doc.kml',
        format: new KML(),
      }),
    });

    return new Map({
      layers: [fons, vector],
      target: document.getElementById('map'),
      view: new View({
        center: this.getCentre('EPSG:25831'),
        projection: 'EPSG:3857',
        zoom: 8,
      }),
    });
  }

  getGML(): any {}
}
