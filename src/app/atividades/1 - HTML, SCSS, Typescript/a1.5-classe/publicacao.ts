export class Publicacao {
  private readonly titulo: string;
  private readonly autor: string;
  private readonly anoPublicacao: number;

  constructor(titulo: string, autor: string, anoPublicacao: number) {
    this.titulo = titulo;
    this.autor = autor;
    this.anoPublicacao = anoPublicacao;
  }

  public getTitulo(): string {
    return this.titulo;
  }

  public getAutor(): string {
    return this.autor;
  }

  public getAnoPublicacao(): number {
    return this.anoPublicacao;
  }

  public descricao(): string {
    return `Título: ${this.titulo}, Autor: ${this.autor}, Ano de Publicação: ${this.anoPublicacao}`;
  }
}
