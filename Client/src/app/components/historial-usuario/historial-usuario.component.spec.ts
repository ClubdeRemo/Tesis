import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialUsuarioComponent } from './historial-usuario.component';

describe('HistorialUsuarioComponent', () => {
  let component: HistorialUsuarioComponent;
  let fixture: ComponentFixture<HistorialUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
