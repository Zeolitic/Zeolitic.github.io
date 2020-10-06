import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionismComponent } from './impressionism.component';

describe('ImpressionismComponent', () => {
  let component: ImpressionismComponent;
  let fixture: ComponentFixture<ImpressionismComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpressionismComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpressionismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
