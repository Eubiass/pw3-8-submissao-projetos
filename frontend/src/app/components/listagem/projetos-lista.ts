import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-projetos-lista',
  imports: [RouterLink],
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
        this.tratarErro(erro, 'carregar os projetos');
      }
    });
  }

  avaliarProjeto(id: number): void {

    const notaInovacaoTexto = prompt('Informe a nota de inovação (0 a 10):');

    if (notaInovacaoTexto === null) {
      return;
    }

    const notaApresentacaoTexto = prompt(
      'Informe a nota de apresentação (0 a 10):'
    );

    if (notaApresentacaoTexto === null) {
      return;
    }

    if ( notaInovacaoTexto.trim() === '' || notaApresentacaoTexto.trim() === '' ) {
      alert('Informe as duas notas.');
      return;
    }

    const notaInovacao = Number(notaInovacaoTexto);
    const notaApresentacao = Number(notaApresentacaoTexto);

    if (
      !Number.isFinite(notaInovacao) ||
      !Number.isFinite(notaApresentacao) ||
      notaInovacao < 0 ||
      notaInovacao > 10 ||
      notaApresentacao < 0 ||
      notaApresentacao > 10
    ) {
      alert('As notas devem estar entre 0 e 10.');
      return;
    }

    this.projetoService.avaliar(id, { notaInovacao, notaApresentacao })
    .subscribe({
      next: () => {
        alert('Projeto avaliado com sucesso!');
        this.listarProjetos();
      },
      error: (erro) => {
        console.error('Erro ao avaliar projeto:', erro);
        this.tratarErro(erro, 'avaliar o projeto');
      }
    });
  }

  excluirProjeto(id: number): void {
    const confirmar = confirm('Deseja realmente excluir este projeto?');
    if (!confirmar) {
      return;
    }
    this.projetoService.excluir(id).subscribe({
      next: () => {
        this.listarProjetos();
        alert('Projeto excluído com sucesso!');
      },
      error: (erro) => {
        console.error('Erro ao excluir projeto:', erro);
        this.tratarErro(erro, 'excluir o projeto');
      }
    });
  }

  private tratarErro(erro: HttpErrorResponse, operacao: string): void {
    if (erro.status === 400) {
      alert( erro.error?.mensagem || 'Dados inválidos. Verifique as informações enviadas.' );
      return;
    }

    if (erro.status === 409) {
      alert( erro.error?.mensagem || 'Conflito ao realizar a operação.');
      return;
    }

    if (erro.status === 0) {
      alert('Não foi possível conectar ao servidor.');
      return;
    }

    alert(`Não foi possível ${operacao}.`);
  }
}