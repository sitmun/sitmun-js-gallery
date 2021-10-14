import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import 'ol/ol.css';
import { register } from 'ol/proj/proj4';
import proj4 from 'proj4';
import DragPan from 'ol/interaction/DragPan';
import KeyboardPan from 'ol/interaction/KeyboardPan';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-pan',
  templateUrl: './pan.component.html',
  styleUrls: ['./pan.component.css']
})
export class PanComponent implements OnInit {

  map: Map;

  constructor( private utilsService: UtilsService ){}

  ngOnInit(): any {
    proj4.defs(
      'EPSG:25831',
      '+proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs'
    );
    proj4.defs(
      'EPSG:3857',
      '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs'
    );
    register(proj4);

    this.map = this.utilsService.getMap();

    if (this.utilsService.hasPanTask()) {
      this.map.addInteraction(new DragPan());
      this.map.addInteraction(new KeyboardPan());
    }
  }
}
