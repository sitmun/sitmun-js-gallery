import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmlComponent } from './gml.component';

describe('GmlComponent', () => {
  let component: GmlComponent;
  let fixture: ComponentFixture<GmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
