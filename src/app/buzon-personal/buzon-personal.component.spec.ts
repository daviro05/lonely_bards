import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuzonPersonalComponent } from './buzon-personal.component';

describe('BuzonPersonalComponent', () => {
  let component: BuzonPersonalComponent;
  let fixture: ComponentFixture<BuzonPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuzonPersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuzonPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
