
import { Component, OnInit } from '@angular/core';

import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-projetos-lista',
  imports: [],
  templateUrl: './projetos-lista.html',
  styleUrl: './projetos-lista.css',
})
export class ProjetosLista implements OnInit {

  projetos: Projeto[] = [];

  constructor(private projetoService: ProjetoService) {}

  ngOnInit(): void {
    this.listarProjetos();
  }

  listarProjetos(): void {
    this.projetoService.listarTodos().subscribe({
      next: (dados) => {
        this.projetos = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar projetos:', erro);
      }
    });
  }

  excluirProjeto(id: number): void {

    const confirmar = confirm('Deseja realmente excluir este projeto?');

    if (confirmar) {

      this.projetoService.excluir(id).subscribe({
        next: () => {
          this.listarProjetos();
          alert('Projeto excluído com sucesso!');
        },
        error: (erro) => {
          console.error('Erro ao excluir projeto:', erro);
          alert('Não foi possível excluir o projeto.');
        }
      });

    }

  }

}
