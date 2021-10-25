import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { UtilsService } from '../../services/utils.service';
import LayerGroup from 'ol/layer/Group';

interface Mapa {
  id: number;
  nom: string;
}

@Component({
  selector: 'app-map-capes',
  templateUrl: './map-capes.component.html',
  styleUrls: ['./map-capes.component.css']
})
export class MapCapesComponent implements OnInit {

  map: Map;
  mapaFons: any = 0;
  mapes: Mapa[] = this.utilsService.readBackgroundMaps();

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

    this.map = this.utilsService.getMap2();
  }

  changeBackgroundMap(): any {
    if (this.mapaFons === 0){
      this.map.setLayerGroup(new LayerGroup());
      this.map.addLayer(this.utilsService.returnOSM());
    }
    else if (this.mapaFons === 1){
      this.map.setLayerGroup(new LayerGroup());
      this.map.addLayer(this.utilsService.returnCAE());
    }
    else if (this.mapaFons === 2){
      this.map.setLayerGroup(new LayerGroup());
      this.map.addLayer(this.utilsService.returnBUE());
    }
  }

}
