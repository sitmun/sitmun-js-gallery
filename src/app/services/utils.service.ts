import {Injectable} from '@angular/core';
import Projection from 'ol/proj/Projection';
import { transform, transformExtent } from 'ol/proj';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }
  myCenter: any;
  workspaceApp = {
    id: 41,
    center: {
      x: 449372,
      y: 4601581.5
    },
    extent: {
      minX: 446439,
      minY: 452305,
      maxX: 4597923,
      maxY: 4605240
    },
    zoom: 13,
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
        ]
      }
    ]
  };

  getDefaultZoom(): number {
    return this.workspaceApp.zoom;
  }

  getCentre(epsgOrig: string): number[] {
    const myCenter = [this.workspaceApp.center.x, this.workspaceApp.center.y];
    return transform(myCenter, epsgOrig, 'EPSG:3857');
  }

  getExtent(): number[]{
    return [this.workspaceApp.extent.minX, this.workspaceApp.extent.minY, this.workspaceApp.extent.maxX, this.workspaceApp.extent.maxY];
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

}
