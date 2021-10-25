import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapCapesComponent } from './map-capes.component';

describe('MapCapesComponent', () => {
  let component: MapCapesComponent;
  let fixture: ComponentFixture<MapCapesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapCapesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapCapesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
