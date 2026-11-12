import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetosLista } from './projetos-lista';

describe('ProjetosLista', () => {
  let component: ProjetosLista;
  let fixture: ComponentFixture<ProjetosLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetosLista],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjetosLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
