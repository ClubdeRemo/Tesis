import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSociosComponent } from './gestion-socios.component';

describe('GestionSociosComponent', () => {
  let component: GestionSociosComponent;
  let fixture: ComponentFixture<GestionSociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionSociosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionSociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
