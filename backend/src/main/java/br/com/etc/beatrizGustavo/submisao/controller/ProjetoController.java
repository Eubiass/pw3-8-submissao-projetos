
package br.com.etc.beatrizGustavo.submisao.controller;

import br.com.etc.beatrizGustavo.submisao.entity.Projeto;
import br.com.etc.beatrizGustavo.submisao.service.ProjetoService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projetos")
public class ProjetoController {

    private final ProjetoService projetoService;

    public ProjetoController(ProjetoService projetoService) {
        this.projetoService = projetoService;
    }

    // GET: lista todos os projetos
    @GetMapping
    public ResponseEntity<List<Projeto>> listarTodos() {
        return ResponseEntity.ok(projetoService.listarTodos());
    }

    // GET: busca um projeto pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Projeto> buscarPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(projetoService.buscarPorId(id));
    }

    // POST: cadastra um novo projeto
    @PostMapping
    public ResponseEntity<Projeto> cadastrar(
            @RequestBody Projeto projeto) {

        Projeto novoProjeto = projetoService.cadastrar(projeto);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(novoProjeto);
    }

    // PUT: atualiza os dados de um projeto
    @PutMapping("/{id}")
    public ResponseEntity<Projeto> atualizar(
            @PathVariable Integer id,
            @RequestBody Projeto projeto) {

        return ResponseEntity.ok(
                projetoService.atualizar(id, projeto)
        );
    }

    // DELETE: exclui um projeto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Integer id) {
        projetoService.excluir(id);

        return ResponseEntity.noContent().build();
    }

    // PATCH: avalia um projeto
    @PatchMapping("/{id}/avaliar")
    public ResponseEntity<Projeto> avaliar(
            @PathVariable Integer id,
            @RequestBody AvaliacaoRequest avaliacao) {

        Projeto projetoAvaliado = projetoService.avaliar(
                id,
                avaliacao.notaInovacao(),
                avaliacao.notaApresentacao()
        );

        return ResponseEntity.ok(projetoAvaliado);
    }

    // Dados recebidos
    public record AvaliacaoRequest(
            Double notaInovacao,
            Double notaApresentacao
    ) {
    }
}
