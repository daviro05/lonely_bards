import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuzonBaseComponent } from './buzon-base.component';

describe('BuzonBaseComponent', () => {
  let component: BuzonBaseComponent;
  let fixture: ComponentFixture<BuzonBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuzonBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuzonBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
