import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoDialogComponent } from './codigo-dialog.component';

describe('CodigoDialogComponent', () => {
  let component: CodigoDialogComponent;
  let fixture: ComponentFixture<CodigoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodigoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodigoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
