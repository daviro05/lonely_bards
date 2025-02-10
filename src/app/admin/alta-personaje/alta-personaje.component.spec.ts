import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaPersonajeComponent } from './alta-personaje.component';

describe('AltaPersonajeComponent', () => {
  let component: AltaPersonajeComponent;
  let fixture: ComponentFixture<AltaPersonajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaPersonajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaPersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
