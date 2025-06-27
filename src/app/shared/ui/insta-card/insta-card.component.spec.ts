import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstaCardComponent } from './insta-card.component';

describe('InstaCardComponent', () => {
  let component: InstaCardComponent;
  let fixture: ComponentFixture<InstaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstaCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InstaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
