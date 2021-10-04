import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import { defaults as defaultInteractions } from 'ol/interaction';
import 'ol/ol.css';
import ImageWMS from 'ol/source/ImageWMS';
import { Image as ImageLayer, Tile as TileLayer } from 'ol/layer';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import DragPan from 'ol/interaction/DragPan';
import KeyboardPan from 'ol/interaction/KeyboardPan';
import {UtilsService} from '../../services/utils.service';
import {Control, defaults as defaultControls} from 'ol/control';

@Component({
  selector: 'app-pan',
  templateUrl: './pan.component.html',
  styleUrls: ['./pan.component.css']
})
export class PanComponent implements OnInit {

  map: Map;

  constructor( private utilsService: UtilsService ){}

  ngOnInit(): any {

    const varPanTask = 1; // Valor que ve de l'API

    proj4.defs(
      'EPSG:25831',
      '+proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs'
    );
    proj4.defs(
      'EPSG:3857',
      '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs'
    );
    register(proj4);

    const myLayers = [
      new TileLayer({
        source: new OSM()
      }),
      new ImageLayer({
        source: new ImageWMS({
          url: 'http://sitmun.diba.cat/wms/servlet/CAE1M',
          crossOrigin: 'anonymous',
          serverType: 'mapserver',
          projection: this.utilsService.getProjection(),
          params: {'LAYERS': 'MTE50_Disponibilitat,CAE1M_141A,CAE1M_112L_FF,CAE1M_122P_FF,CAE1M_123P_FF'},
        }),
      })
    ];

    this.map = new Map({
      controls: [],
      interactions: defaultInteractions({
        dragAndDrop: false,
        dragPan: false,
        keyboardPan: false
      }),
      layers: myLayers,
      target: 'map',
      view: new View({
        projection: 'EPSG:3857',
        center: this.utilsService.getCentre('EPSG:25831'),
        zoom: this.utilsService.getDefaultZoom()
      })
    });

    // Condicionals amb els controls que afegeixen
    if (varPanTask) {
      this.map.addInteraction(new DragPan());
      this.map.addInteraction(new KeyboardPan());
    }
  }
}
