import { Publicacao } from './publicacao';

export class Livro extends Publicacao {
  private readonly ISBN: string;

  constructor(titulo: string, autor: string, anoPublicacao: number, ISBN: string) {
    super(titulo, autor, anoPublicacao);
    this.ISBN = ISBN;
  }

  public descricao(): string {
    return `${super.descricao()}, ISBN: ${this.ISBN}`;
  }

  public getISBN(): string {
    return this.ISBN;
  }
}
