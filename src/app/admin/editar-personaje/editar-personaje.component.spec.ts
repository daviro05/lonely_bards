import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPersonajeComponent } from './editar-personaje.component';

describe('EditarPersonajeComponent', () => {
  let component: EditarPersonajeComponent;
  let fixture: ComponentFixture<EditarPersonajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarPersonajeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarPersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
