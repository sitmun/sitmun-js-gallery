import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltresFormatsComponent } from './altres-formats.component';

describe('AltresFormatsComponent', () => {
  let component: AltresFormatsComponent;
  let fixture: ComponentFixture<AltresFormatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltresFormatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AltresFormatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
