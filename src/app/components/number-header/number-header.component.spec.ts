import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberHeaderComponent } from './number-header.component';

describe('NumberHeaderComponent', () => {
  let component: NumberHeaderComponent;
  let fixture: ComponentFixture<NumberHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
