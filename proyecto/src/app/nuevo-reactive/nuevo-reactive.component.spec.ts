import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoReactiveComponent } from './nuevo-reactive.component';

describe('NuevoReactiveComponent', () => {
  let component: NuevoReactiveComponent;
  let fixture: ComponentFixture<NuevoReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoReactiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
