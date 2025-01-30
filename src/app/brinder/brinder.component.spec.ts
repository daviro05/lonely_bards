import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrinderComponent } from './brinder.component';

describe('BrinderComponent', () => {
  let component: BrinderComponent;
  let fixture: ComponentFixture<BrinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrinderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
