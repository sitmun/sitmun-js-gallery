import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'ol/ol.css';
import ImageWMS from 'ol/source/ImageWMS';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import { Image as ImageLayer, Tile as TileLayer } from 'ol/layer';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-map-two',
  templateUrl: './map-two.component.html',
  styleUrls: ['./map-two.component.css']
})
export class MapTwoComponent implements OnInit {

  informacio: any = [];
  map: Map;

  constructor(private httpClient: HttpClient, public authService: AuthService){}

  ngOnInit(): void {
    const headers = new HttpHeaders().set('Authorization', this.authService.getTokenAPI);
    this.httpClient.get('https://sitmun-backend-core.herokuapp.com/api/workspace', {headers}).subscribe( data => {
      this.informacio = data;
    });

    const layers = [
      new TileLayer({
        source: new OSM(),
      }),
      new ImageLayer({
        source: new ImageWMS({
          url: 'http://sitmun.diba.cat/wms/servlet/CAE1M'
        }),
      })
    ];

    this.map = new Map({
      view: new View({
        center: [242401, 5068866],
        zoom: 16,
      }),
      target: 'map',
      layers: layers
    });
  }

}
