import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CadastroItem } from './type';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private dataSource: CadastroItem[] = [
    { nome: "Teste1", email: "teste@email1.com", senha: "1234", cep: "80250104", logradouro: "Rua teste" }
  ];

  private dataSubject = new BehaviorSubject<CadastroItem[]>(this.dataSource);

  constructor() { }

  getDataSubject() {
    return this.dataSubject.asObservable();
  }

  updateData(data: CadastroItem) {
    const currentData = [...this.dataSubject.value];
    currentData.push(data);
    this.dataSubject.next(currentData);
  }

  editData(newData: CadastroItem, index: number) {
    const currentData = [...this.dataSubject.value]; 
    if (index >= 0 && index < currentData.length) {
      currentData[index] = newData;
      this.dataSubject.next(currentData);
    } else {
      console.error('Índice inválido:', index);
    }
  }

  removeData(index: number) {
    const currentData = [...this.dataSubject.value]; 
    if (index >= 0 && index < currentData.length) {
      currentData.splice(index, 1); 
      this.dataSubject.next(currentData);
    } else {
      console.error('Índice inválido:', index);
    }
  }
}
