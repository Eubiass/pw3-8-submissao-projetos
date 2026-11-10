import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Projeto } from '../models/projeto';

export interface AvaliacaoRequest {
  notaInovacao: number;
  notaApresentacao: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {

  private readonly apiUrl = 'http://localhost:8080/api/projetos';

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.apiUrl}/${id}`);
  }

  cadastrar(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>(this.apiUrl, projeto);
  }

  atualizar(id: number, projeto: Projeto): Observable<Projeto> {
    return this.http.put<Projeto>(`${this.apiUrl}/${id}`, projeto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  avaliar(id: number, avaliacao: AvaliacaoRequest): Observable<Projeto> {
    return this.http.patch<Projeto>(
      `${this.apiUrl}/${id}/avaliar`,
      avaliacao
    );
  }
}
