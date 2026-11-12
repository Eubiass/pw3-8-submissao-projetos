package br.com.etc.beatrizGustavo.submisao.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "projeto")
public class Projeto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "TX_TITULO", nullable = false, length = 255)
    private String titulo;

    @Column(name = "TX_AREA_CONHECIMENTO", nullable = false, length = 100)
    private String areaConhecimento;

    @Column(name = "FL_NOTA_INOVACAO")
    private Double notaInovacao;

    @Column(name = "FL_NOTA_APRESENTACAO")
    private Double notaApresentacao;

    @Column(name = "FL_MEDIA_FINAL")
    private Double mediaFinal;

    @Column(name = "TX_STATUS", nullable = false, length = 20)
    private String status = "PENDENTE";

    public Projeto() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getAreaConhecimento() {
        return areaConhecimento;
    }

    public void setAreaConhecimento(String areaConhecimento) {
        this.areaConhecimento = areaConhecimento;
    }

    public Double getNotaInovacao() {
        return notaInovacao;
    }

    public void setNotaInovacao(Double notaInovacao) {
        this.notaInovacao = notaInovacao;
    }

    public Double getNotaApresentacao() {
        return notaApresentacao;
    }

    public void setNotaApresentacao(Double notaApresentacao) {
        this.notaApresentacao = notaApresentacao;
    }

    public Double getMediaFinal() {
        return mediaFinal;
    }

    public void setMediaFinal(Double mediaFinal) {
        this.mediaFinal = mediaFinal;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
