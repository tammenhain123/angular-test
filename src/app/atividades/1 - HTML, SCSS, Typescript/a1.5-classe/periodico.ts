// Periodico.ts
import { Publicacao } from './publicacao';

export class Periodico extends Publicacao {
  private readonly ISSN: string;

  constructor(titulo: string, autor: string, anoPublicacao: number, ISSN: string) {
    super(titulo, autor, anoPublicacao);
    this.ISSN = ISSN;
  }

  public descricao(): string {
    return `${super.descricao()}, ISSN: ${this.ISSN}`;
  }

  public getISSN(): string {
    return this.ISSN;
  }
}
