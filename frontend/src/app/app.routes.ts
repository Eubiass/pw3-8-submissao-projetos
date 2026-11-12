
import { Routes } from '@angular/router';

import { ProjetosLista } from './components/listagem/projetos-lista';
import { Formulario } from './components/formulario/formulario';

export const routes: Routes = [
  {
    path: 'projetos',
    component: ProjetosLista
  },
  {
    path: 'projetos/novo',
    component: Formulario
  },
  {
    path: 'projetos/:id/editar',
    component: Formulario
  }
];
