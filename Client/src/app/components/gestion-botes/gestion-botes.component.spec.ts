import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionBotesComponent } from './gestion-botes.component';

describe('GestionBotesComponent', () => {
  let component: GestionBotesComponent;
  let fixture: ComponentFixture<GestionBotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionBotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionBotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
