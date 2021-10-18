import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapBackComponent } from './map-back.component';

describe('MapBackComponent', () => {
  let component: MapBackComponent;
  let fixture: ComponentFixture<MapBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapBackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
