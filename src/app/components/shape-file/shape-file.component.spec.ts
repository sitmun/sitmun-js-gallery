import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeFileComponent } from './shape-file.component';

describe('ShapeFileComponent', () => {
  let component: ShapeFileComponent;
  let fixture: ComponentFixture<ShapeFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapeFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
