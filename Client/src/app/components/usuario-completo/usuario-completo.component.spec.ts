import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCompletoComponent } from './usuario-completo.component';

describe('UsuarioCompletoComponent', () => {
  let component: UsuarioCompletoComponent;
  let fixture: ComponentFixture<UsuarioCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioCompletoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
