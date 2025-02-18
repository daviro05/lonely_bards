import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBuzonAdminComponent } from './lista-buzon-admin.component';

describe('ListaBuzonAdminComponent', () => {
  let component: ListaBuzonAdminComponent;
  let fixture: ComponentFixture<ListaBuzonAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaBuzonAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaBuzonAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
