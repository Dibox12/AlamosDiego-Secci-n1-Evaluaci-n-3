import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuebleFormComponent } from './mueble-form.component';

describe('MuebleFormComponent', () => {
  let component: MuebleFormComponent;
  let fixture: ComponentFixture<MuebleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MuebleFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MuebleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
