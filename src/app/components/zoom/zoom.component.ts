import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import { defaults as defaultInteractions } from 'ol/interaction';
import { ZoomSlider } from 'ol/control';
import { Zoom } from 'ol/control';
import 'ol/ol.css';
import ImageWMS from 'ol/source/ImageWMS';
import Projection from 'ol/proj/Projection';
import { Image as ImageLayer, Tile as TileLayer } from 'ol/layer';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import SitmunJS from '@sitmun/sitmun-js';
import { transform, transformExtent } from 'ol/proj';
import DoubleClickZoom from 'ol/interaction/DoubleClickZoom';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {

  map: Map;
  SitmunJsClient = new SitmunJS({ basePath: 'https://sitmun-backend-core.herokuapp.com/' });
  centreX: number;
  centreY: number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  // data: WorkspaceApplication;

  constructor(){}

  // tslint:disable-next-line:typedef
  async ngOnInit() {

    // --- obtener la informacón del backend

    await this.SitmunJsClient.workspaceApplication(1, 41).then((data) => {
      this.centreX = data.territory.center.x;
      this.centreY = data.territory.center.y;
      this.minX = data.territory.extent.minX;
      this.maxX = data.territory.extent.maxX;
      this.minY = data.territory.extent.minY;
      this.maxY = data.territory.extent.maxY;
    });
    const myExtent = [this.minX, this.maxX, this.minY, this.maxY];
    const myCentre = [this.centreX, this.centreY];

    // tengo algo que me ha devuelto una variable "data" que prepresenta una instancia de WorkspaceAppplication

    // Controls de ZOOM
    // varZoomSlider = zoomSlider(data) <--- es la más sencilla
    // varZoomSlider = data.getDefaultZoomSlider()

    const varZoomSlider = 1; // Valor hauria de venir de la API
    const zoomSlider = new ZoomSlider();
    const zoomButtons = new Zoom();
    const zoomClick = new DoubleClickZoom();

    proj4.defs(
      'EPSG:25831',
      '+proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs'
    );
    proj4.defs(
      'EPSG:3857',
      '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs'
    );
    register(proj4);
    const myProjection = new Projection({
      code: 'EPSG:25831',
      extent: [this.minX, this.maxX, this.minY, this.maxY] // defaultExtent(data)
    });
    const myProjection2 = new Projection({
      code: 'EPSG:3857',
      extent: transformExtent(myExtent, 'EPSG:25831', 'EPSG:3857')
    });

    // const myLAyers = backgroundLayers(data) (devuelve un array de layers)

    const myLayers = [
      new TileLayer({
        source: new OSM()
      }),
      new ImageLayer({
        source: new ImageWMS({
          url: 'http://sitmun.diba.cat/wms/servlet/CAE1M',
          crossOrigin: 'anonymous',
          serverType: 'mapserver',
          projection: myProjection,
          params: {'LAYERS': 'MTE50_Disponibilitat,CAE1M_141A,CAE1M_112L_FF,CAE1M_122P_FF,CAE1M_123P_FF'},
        }),
      })
    ];

    this.map = new Map({
      controls: [],  // getDefaultInteractionsForTheWorkspace(data)
      interactions: defaultInteractions({
        doubleClickZoom: false, // shouldDoubleClickZoomBeEnabled(data) { return false }
        keyboardZoom: false,
        mouseWheelZoom: false,
        dragPan: false
      }),
      layers: myLayers,
      target: 'map',
      view: new View({
        projection: 'EPSG:3857',
        center: transform(myCentre, 'EPSG:25831', 'EPSG:3857'),
        zoom: 12,
      })
    });

    // Condicionals amb els controls que afegeixen
    if (varZoomSlider) {
      this.map.addControl(zoomSlider);
      this.map.addControl(zoomButtons);
      this.map.addInteraction(zoomClick);
    }
  }

}
