import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LonelyBardsComponent } from './lonely-bards.component';

describe('LonelyBardsComponent', () => {
  let component: LonelyBardsComponent;
  let fixture: ComponentFixture<LonelyBardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LonelyBardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LonelyBardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
