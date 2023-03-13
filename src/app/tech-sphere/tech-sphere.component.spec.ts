import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechSphereComponent } from './tech-sphere.component';

describe('TechSphereComponent', () => {
  let component: TechSphereComponent;
  let fixture: ComponentFixture<TechSphereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechSphereComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechSphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
