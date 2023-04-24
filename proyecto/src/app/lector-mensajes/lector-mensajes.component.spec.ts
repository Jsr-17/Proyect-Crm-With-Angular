import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectorMensajesComponent } from './lector-mensajes.component';

describe('LectorMensajesComponent', () => {
  let component: LectorMensajesComponent;
  let fixture: ComponentFixture<LectorMensajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LectorMensajesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectorMensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
