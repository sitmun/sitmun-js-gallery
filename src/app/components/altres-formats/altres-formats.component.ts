import { Component, OnInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import WMTS, {optionsFromCapabilities} from 'ol/source/WMTS';
import { Tile as TileLayer } from 'ol/layer';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import WMTSCapabilities from 'ol/format/WMTSCapabilities';


@Component({
  selector: 'app-altres-formats',
  templateUrl: './altres-formats.component.html',
  styleUrls: ['./altres-formats.component.css']
})
export class AltresFormatsComponent implements OnInit {

  map: Map;

  constructor(){}

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    proj4.defs(
      'EPSG:25831',
      '+proj=utm +zone=31 +ellps=GRS80 +units=m +no_defs'
    );
    proj4.defs(
      'EPSG:3857',
      '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs'
    );
    register(proj4);

    this.map = new Map ({
      layers: [
        new TileLayer({
          source: new OSM(),
          opacity: 0.7
        })
      ],
      target: document.getElementById('map'),
      view: new View({
        center: [449372, 4601581.5],
        zoom: 5,
      })
    });

    const parser = new WMTSCapabilities();
    let options;

    await fetch('https://geoserveis.icgc.cat/icc_mapesmultibase/utm/wmts/topo/1.0.0/WMTSCapabilities.xml')
      .then(function(response): any {
        return response.text();
      }).then(function(text): any {
      const result = parser.read(text);
      options = optionsFromCapabilities(result, {
        layer: 'ortogris',
        matrixSet: 'UTM25831'
      });
    });

    const LayerWMTS = new TileLayer({
      source: new WMTS(options),
      opacity: 1
    });

    this.map.addLayer(LayerWMTS);

  }

}
