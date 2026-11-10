package br.com.etc.beatrizGustavo.submisao.service;

import br.com.etc.beatrizGustavo.submisao.entity.Projeto;
import br.com.etc.beatrizGustavo.submisao.repository.ProjetoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class ProjetoService {

    private final ProjetoRepository projetoRepository;

    public ProjetoService(ProjetoRepository projetoRepository) {
        this.projetoRepository = projetoRepository;
    }

    // Lista todos os projetos
    @Transactional(readOnly = true)
    public List<Projeto> listarTodos() {
        return projetoRepository.findAll();
    }

    // Busca um projeto pelo ID
    @Transactional(readOnly = true)
    public Projeto buscarPorId(Integer id) {
        return projetoRepository.findById(id)
                .orElseThrow(() ->
                        new NoSuchElementException("Projeto não encontrado."));
    }

    // Cadastra um novo projeto
    public Projeto cadastrar(Projeto projeto) {
        validarDadosBasicos(projeto);

        projeto.setId(null);
        projeto.setNotaInovacao(null);
        projeto.setNotaApresentacao(null);
        projeto.setMediaFinal(null);
        projeto.setStatus("PENDENTE");

        return projetoRepository.save(projeto);
    }

    // Atualiza os dados básicos de um projeto
    public Projeto atualizar(Integer id, Projeto dadosAtualizados) {
        validarDadosBasicos(dadosAtualizados);

        Projeto projeto = buscarPorId(id);

        projeto.setTitulo(dadosAtualizados.getTitulo());
        projeto.setAreaConhecimento(
                dadosAtualizados.getAreaConhecimento()
        );

        return projetoRepository.save(projeto);
    }

    // Exclui um projeto
    public void excluir(Integer id) {
        Projeto projeto = buscarPorId(id);
        projetoRepository.delete(projeto);
    }

    // Avalia um projeto e calcula sua média final
    public Projeto avaliar(
            Integer id,
            Double notaInovacao,
            Double notaApresentacao
    ) {
        validarNota(notaInovacao);
        validarNota(notaApresentacao);

        Projeto projeto = buscarPorId(id);

        projeto.setNotaInovacao(notaInovacao);
        projeto.setNotaApresentacao(notaApresentacao);

        double media = (notaInovacao + notaApresentacao) / 2.0;

        projeto.setMediaFinal(media);

        if (media >= 7.0) {
            projeto.setStatus("APROVADO");
        } else {
            projeto.setStatus("REVISAR");
        }

        return projetoRepository.save(projeto);
    }

    // Valida título e área de conhecimento
    private void validarDadosBasicos(Projeto projeto) {
        if (projeto == null
                || projeto.getTitulo() == null
                || projeto.getTitulo().isBlank()) {
            throw new IllegalArgumentException(
                    "O título do projeto é obrigatório."
            );
        }

        if (projeto.getAreaConhecimento() == null
                || projeto.getAreaConhecimento().isBlank()) {
            throw new IllegalArgumentException(
                    "A área de conhecimento é obrigatória."
            );
        }
    }

    // Valida se a nota está entre 0 e 10
    private void validarNota(Double nota) {
        if (nota == null || nota < 0 || nota > 10) {
            throw new IllegalArgumentException(
                    "As notas devem estar entre 0 e 10."
            );
        }
    }
}
