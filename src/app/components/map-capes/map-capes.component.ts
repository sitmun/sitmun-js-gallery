import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { UtilsService } from '../../services/utils.service';
import LayerGroup from 'ol/layer/Group';
import { FormControl } from '@angular/forms';

interface MapaFons {
  id: number;
  nom: string;
}

interface Capa {
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
  mapes: MapaFons[] = this.utilsService.readBackgroundMaps();
  capesWMS: Capa[] = this.utilsService.readLayers();
  capes = new FormControl();
  capaSeleccionada = new FormControl();
  opacitatCapaSeleccionada = new FormControl();

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
    // @ts-ignore
    this.capes.value = [0, 1, 2];
  }

  changeLayers(): any {
    this.map.setLayerGroup(new LayerGroup());
    for (const i of this.capes.value){
      if (i === 0) {
        this.map.addLayer(this.utilsService.returnOSM());
      }
      if (i === 1) {
        this.map.addLayer(this.utilsService.returnCAE());
      }
      if (i === 2) {
        this.map.addLayer(this.utilsService.returnBUE());
      }
    }
  }

  opacityFunction(): any {
    const numCapaSelec = this.capaSeleccionada.value;
    const capesMapa = this.map.getLayerGroup();
    let opActual;

    // tslint:disable-next-line:only-arrow-functions
    capesMapa.getLayers().forEach( function(layer, i): any{
      if ( i === numCapaSelec ){
        opActual = layer.getOpacity();
      }
    });
    (document.getElementById('opSlider2') as HTMLInputElement).value = opActual;
  }

  canviOpacitat(): any {
    const numCapaSelec = this.capaSeleccionada.value;
    const capesMapa = this.map.getLayerGroup();
    const opActual = this.opacitatCapaSeleccionada.value;

    // tslint:disable-next-line:only-arrow-functions
    capesMapa.getLayers().forEach( function(layer, i): any{
      if ( i === numCapaSelec ){
        layer.setOpacity(parseFloat(opActual));
      }
    });
  }

}
