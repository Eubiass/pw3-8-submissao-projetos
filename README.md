# Planejamento do Projeto Prático: Angular + Spring Boot

**Duração Total:** 12 Horas (6 encontros de 2 horas)  
**Nível:** Ensino Técnico  
**Foco:** Backend Spring Boot (1 Entidade JPA + Regras de Negócio) e Frontend Angular (Interface CRUD + Integração REST)  

---

## 📅 Cronograma de Entregas por Aula (2h por Encontro)

### Aula 1 — 20/10: Modelagem do Backend e Configuração Inicial
* **Objetivo:** Criar o projeto Spring Boot, configurar o banco H2 e criar a Entidade principal com JPA.
* **Entregáveis (Backend):**
  * Projeto gerado no *Spring Initializr* (`Web`, `JPA`, `H2`, `Lombok`).
  * Classe `@Entity` mapeada com seus atributos e anotações `@Id`, `@GeneratedValue`.
  * Interface `Repository` estendendo `JpaRepository`.
  * Aplicação executando com banco H2 ativo e tabela gerada.

### Aula 2 — 27/10: Implementação das Regras de Negócio e Endpoints REST
* **Objetivo:** Escrever a lógica de negócio na camada Service e expor a API REST.
* **Entregáveis (Backend):**
  * Classe `@Service` contendo a regra de negócio central da entidade.
  * Classe `@RestController` com os métodos `GET`, `POST`, `PUT`, `DELETE` e os métodos customizados da regra de negócio.
  * Testes locais dos endpoints via Postman, Bruno ou Swagger.

### Aula 3 — 03/11: Inicialização do Frontend Angular e Serviço REST
* **Objetivo:** Criar o projeto Angular, configurar rotas e implementar o serviço HTTP.
* **Entregáveis (Frontend):**
  * Projeto Angular criado e limpo com módulo de rotas ativado.
  * Configuração do `HttpClient` / `provideHttpClient()`.
  * Criação da interface TypeScript (model) idêntica ao DTO/Entity Java.
  * Criação do `@Injectable Service` com métodos para consumir todos os endpoints do Spring Boot.

### Aula 4 — 10/11: Interface Gráfica — Listagem e Operações Rápidas
* **Objetivo:** Desenvolver o componente principal de exibição e ação de regra de negócio.
* **Entregáveis (Frontend):**
  * Componente de Listagem com tabela ou cards renderizados dinamicamente via `*ngFor` / `@for`.
  * Integração com o Service para carregar dados do Backend (`GET`).
  * Botões de ação direta (ex: botão "Concluir", "Votar", "Reservar" ou "Debitar") consumindo os endpoints customizados.
  * Exclusão (`DELETE`) integrada na tabela.

### Aula 5 — 17/11: Interface Gráfica — Formulário e Validações
* **Objetivo:** Criar tela ou modal para cadastro e edição de registros.
* **Entregáveis (Frontend):**
  * Componente de Formulário utilizando `ReactiveFormsModule`.
  * Validações de campos no front (campos obrigatórios, valores mínimos, etc.).
  * Integração do formulário com as rotas `POST` (Criação) e `PUT` (Edição).
  * Feedback visual ao usuário (mensagens de sucesso/erro ou alertas).

### Aula 6 — 24/11: Polimento, Tratamento de Erros e Apresentação Final
* **Objetivo:** Ajustes finais, integração `CORS`, tratamento de exceções e entrega final.
* **Entregáveis (Geral):**
  * Ajuste de `CORS` no Spring Boot (`@CrossOrigin`).
  * Tratamento básico de erros no Angular (exibir mensagem quando a regra de negócio do Java bloquear algo).
  * Teste do fluxo completo (End-to-End): Cadastrar $\rightarrow$ Listar $\rightarrow$ Executar Regra $\rightarrow$ Editar $\rightarrow$ Excluir.
  * Apresentação/Avaliação do projeto finalizado.

---

## 🚀 Gestor de Submissão da Feira de Ciências
* **Entidade:** `Projeto` (`id`, `titulo`, `areaConhecimento`, `notaInovacao`, `notaApresentacao`, `mediaFinal`, `status`)
* **Regra de Negócio:** Ao enviar as notas, o backend calcula a `mediaFinal` e atualiza automaticamente o `status` para `APROVADO` (se `mediaFinal >= 7.0`) ou `REVISAR`.
* **Endpoints:**
  * `GET /api/projetos` — Lista projetos submetidos.
  * `GET /api/projetos/{id}` — Detalhes do projeto e avaliação.
  * `POST /api/projetos` — Cadastra projeto inicial (sem notas).
  * `PUT /api/projetos/{id}` — Edita dados do projeto.
  * `DELETE /api/projetos/{id}` — Exclui projeto.
  * `PATCH /api/projetos/{id}/avaliar` — Envia notas, calcula a média e define o status.

* **Pseudocódigo da Regra de Negócio (Avaliação e Cálculo de Média):**
```text
Função avaliarProjeto(projetoId, notaInovacao, notaApresentacao):
    projeto = repository.buscarPorId(projetoId)
    
    projeto.notaInovacao = notaInovacao
    projeto.notaApresentacao = notaApresentacao
    projeto.mediaFinal = (notaInovacao + notaApresentacao) / 2
    
    Se projeto.mediaFinal >= 7.0 Então
        projeto.status = "APROVADO"
    Senão
        projeto.status = "REVISAR"
    FimSe
    
    Retornar repository.salvar(projeto)
FimFuncao
```
