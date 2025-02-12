import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBuzonComponent } from './lista-buzon.component';

describe('ListaBuzonComponent', () => {
  let component: ListaBuzonComponent;
  let fixture: ComponentFixture<ListaBuzonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaBuzonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaBuzonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
