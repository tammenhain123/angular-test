import { CadastroService } from './../../services/CadastroService/cadastroService';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from "@angular/material/dialog"
import { FormularioComponent } from './formulario/formulario.component';
import { FormControl } from '@angular/forms';
import { CadastroItem } from 'src/app/services/CadastroService/type';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit, OnDestroy {
  data$: Observable<CadastroItem[]> = this.cadastroService.getDataSubject();
  private destroy$ = new Subject<void>();

  constructor(private dialog: MatDialog, private cadastroService: CadastroService) { }

  filtro = new FormControl();

  displayedColumns: string[] = ['actions', 'nome', 'email', 'senha', 'cep', 'logradouro'];
  dataSource: CadastroItem[] = [];

  ngOnInit(): void {
    this.filtro.valueChanges.pipe(
      takeUntil(this.destroy$),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(valor => {
      this.filtrar(valor);
    });

    this.data$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.dataSource = data;
    });
  }

  filtrar(valor: string) {
    this.cadastroService.getDataSubject().pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.dataSource = data.filter(item => {
        return item.nome.toLowerCase().includes(valor.toLowerCase());
      });
    });
  }

  adicionar() {
    const dialogRef = this.dialog.open(FormularioComponent);
    dialogRef.afterClosed().subscribe(() => {
      console.log('O diálogo foi fechado');
    });
  }

  editar(pessoa: CadastroItem, index: number) {
    this.dialog.open(FormularioComponent, {
      data: { pessoa: pessoa, index: index } 
    });
  }

  remover(pessoa: CadastroItem, index: number) {
    if (!confirm("Deseja remover a pessoa "  + pessoa.nome )) return;
    this.cadastroService.removeData(index); 
    alert("removido com sucesso!");
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
