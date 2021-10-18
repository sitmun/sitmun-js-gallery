import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import { ZoomSlider, Zoom } from 'ol/control';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import 'ol/ol.css';
import proj4 from 'proj4';
import { register } from 'ol/proj/proj4';
import DoubleClickZoom from 'ol/interaction/DoubleClickZoom';
import { UtilsService } from '../../services/utils.service';
import { transformExtent } from 'ol/proj';
import FullScreen from 'ol/control/FullScreen';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.css']
})
export class ZoomComponent implements OnInit {

  map: Map;

  constructor( private utilsService: UtilsService ){}

  ngOnInit(): any {
    proj4.defs(
      'EPSG:25831',
      '+proj=utm +zone=31 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    );
    proj4.defs(
      'EPSG:3857',
      '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs'
    );
    register(proj4);

    this.map = this.utilsService.getMap();

    if (this.utilsService.hasZoomTask()) {
      this.map.addControl(new ZoomSlider());
      this.map.addControl(new Zoom());
      this.map.addInteraction(new DoubleClickZoom());
      this.map.addControl(new FullScreen());
      this.map.addControl(new ZoomToExtent({
        extent: this.utilsService.getExtent()
      }));
    }
  }

  centerMap(): void {
    this.map.getView().setCenter(this.utilsService.getCentre('EPSG:25831'));
  }

}
