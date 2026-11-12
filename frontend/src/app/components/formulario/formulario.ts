import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Projeto } from '../../models/projeto';
import { ProjetoService } from '../../services/projeto.service';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.html',
  styleUrl: './formulario.css',
})
export class Formulario implements OnInit {

  formulario!: FormGroup;
  idProjeto: number | null = null;
  carregando = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projetoService: ProjetoService
  ) {}

  ngOnInit(): void {

    this.formulario = this.fb.group({
      titulo: ['', Validators.required], areaConhecimento: ['', Validators.required]
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== null) {
      this.idProjeto = Number(id);
      this.buscarProjeto(this.idProjeto);
    }
  }

  buscarProjeto(id: number): void {
    this.carregando = true;

    this.projetoService.buscarPorId(id).subscribe({
      next: (projeto) => {
        this.formulario.patchValue({
          titulo: projeto.titulo, areaConhecimento: projeto.areaConhecimento
        });
        this.carregando = false;
      },
      error: (erro: HttpErrorResponse) => {
        console.error('Erro ao buscar projeto:', erro);
        this.tratarErro(erro, 'carregar o projeto');
        this.carregando = false;
      }
    });
  }

  salvar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const projeto: Projeto = {
      id: this.idProjeto,
      titulo: this.formulario.value.titulo,
      areaConhecimento: this.formulario.value.areaConhecimento,
      notaInovacao: null,
      notaApresentacao: null,
      mediaFinal: null,
      status: 'PENDENTE'
    };

    if (this.idProjeto === null) {
      this.projetoService.cadastrar(projeto).subscribe({
        next: () => {
          alert('Projeto cadastrado com sucesso!');
          this.router.navigate(['/projetos']);
        },
        error: (erro: HttpErrorResponse) => {
          console.error('Erro ao cadastrar projeto:', erro);
          this.tratarErro(erro, 'cadastrar o projeto');
        }
      });

    } else {
      this.projetoService.atualizar(this.idProjeto, projeto).subscribe({
        next: () => {
          alert('Projeto atualizado com sucesso!');
          this.router.navigate(['/projetos']);
        },
        error: (erro: HttpErrorResponse) => {
          console.error('Erro ao atualizar projeto:', erro);
          this.tratarErro(erro, 'atualizar o projeto');
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/projetos']);
  }

  private tratarErro(erro: HttpErrorResponse, operacao: string): void {
    if (erro.status === 400) {
      alert(
        erro.error?.mensagem ||
        'Dados inválidos. Verifique as informações.'
      );
      return;
    }

    if (erro.status === 404) {
      alert( erro.error?.mensagem || 'O projeto solicitado não foi encontrado.' );
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
