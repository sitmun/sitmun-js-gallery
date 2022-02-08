import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import { UtilsService } from '../../services/utils.service';
import * as shapefile from 'shapefile';
import {Vector as VectorSource} from 'ol/source';
import { Image as ImageLayer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import GeoJSON from 'ol/format/GeoJSON';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';

@Component({
  selector: 'app-shape',
  templateUrl: './shape.component.html',
  styleUrls: ['./shape.component.css']
})
export class ShapeComponent implements OnInit {

  map: Map;

  constructor( private utilsService: UtilsService ){}

  ngOnInit(): void {
    proj4.defs(
      'EPSG:25831',
      '+proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs'
    );
    proj4.defs(
      'EPSG:3857',
      '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs'
    );
    register(proj4);

    this.map = this.utilsService.getShapeFile();
  }

  // tslint:disable-next-line:typedef
  async loadShp() {
    let layer;
    await shapefile.open('../../assets/aigua-punts')
      .then(source => source.read()
        // tslint:disable-next-line:typedef only-arrow-functions
        .then(function(result) {
          layer = result;
        }));
    const vectorSource = new VectorSource({
      features: new GeoJSON({featureProjection: 'EPSG:3857'}).readFeatures(layer.value.geometry),
    });
    const vector = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new CircleStyle({
          radius: 10,
          fill: null,
          stroke: new Stroke({
            color: 'magenta',
          })
        })
      })
    });
    this.map.addLayer(vector);
  }
}
