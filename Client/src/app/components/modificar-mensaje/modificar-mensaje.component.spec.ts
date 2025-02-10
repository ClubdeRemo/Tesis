import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMensajeComponent } from './modificar-mensaje.component';

describe('ModificarMensajeComponent', () => {
  let component: ModificarMensajeComponent;
  let fixture: ComponentFixture<ModificarMensajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModificarMensajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarMensajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
