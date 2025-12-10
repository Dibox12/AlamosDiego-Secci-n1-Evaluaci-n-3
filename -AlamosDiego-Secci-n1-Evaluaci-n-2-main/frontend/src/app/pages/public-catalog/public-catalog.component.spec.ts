import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCatalogComponent } from './public-catalog.component';

describe('PublicCatalogComponent', () => {
  let component: PublicCatalogComponent;
  let fixture: ComponentFixture<PublicCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
