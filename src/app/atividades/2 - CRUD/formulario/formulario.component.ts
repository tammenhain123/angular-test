import { CadastroService } from './../../../services/CadastroService/cadastroService';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CadastroItem } from 'src/app/services/CadastroService/type';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent implements OnInit {
  logradouro = ''

  constructor(private http: HttpClient, 
    private cadastroService: CadastroService, 
    private dialogRef: MatDialogRef<FormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {pessoa: CadastroItem, index: number}
  ) { }

  form!: FormGroup;

  ngOnInit(): void {
    this.initForm(); 
  }

  initForm() {
    const nome = this.data ? this.data.pessoa.nome : '';
    const email = this.data ? this.data.pessoa.email : '';
    const senha = this.data ? this.data.pessoa.senha : '';
    const cep = this.data ? this.data.pessoa.cep : '';
    const logradouro = this.data ? this.data.pessoa.logradouro : '';

    this.form = new FormGroup({
      nome: new FormControl(nome, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      email: new FormControl(email, [Validators.required, Validators.email]),
      senha: new FormControl(senha, [Validators.required]),
      cep: new FormControl(cep, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
      logradouro: new FormControl({ value: logradouro, disabled: true }, [Validators.required])
    });
  }

  onCepChange() {
    const cepControl = this.form.controls.cep;
    if (cepControl.valid && cepControl.value.length === 8) {
      this.buscarCep(cepControl.value).subscribe(
        (data: any) => {
          this.form.controls.logradouro.setValue(data.logradouro);
          this.logradouro = data.logradouro
        },
        error => {
          console.error('Erro ao buscar o CEP:', error);
        }
      );
    }
  }

  buscarCep(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get(url);
  }

  onSubmit() {
    if (this.form.invalid) {
      alert('Formulário inválido');
    } else {
      const formData: CadastroItem = this.form.value;
      formData.logradouro = this.logradouro ? this.logradouro : this.data.pessoa.logradouro
      if(this.data){
        this.cadastroService.editData(formData, this.data.index); 
      }else{
        this.cadastroService.updateData(formData); 
      }
      this.dialogRef.close();
    }
  }
}
