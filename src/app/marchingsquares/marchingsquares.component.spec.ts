import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchingsquaresComponent } from './marchingsquares.component';

describe('MarchingsquaresComponent', () => {
  let component: MarchingsquaresComponent;
  let fixture: ComponentFixture<MarchingsquaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarchingsquaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchingsquaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
