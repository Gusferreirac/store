import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ClientsService } from '../../../services/clients.service';
@Component({
  selector: 'app-create',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './create.component.html',
})
export class CreateComponent {
  private fb = inject(FormBuilder);
  private clientsService = inject(ClientsService);
  private router = inject(Router);

  clientForm: FormGroup;

  constructor() {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      phone: [''],
      address: [''],
    });
  }

  onSubmit(): void {
    this.clientForm.markAllAsTouched();

    if (this.clientForm.invalid) {
      console.log('Formulário inválido');
      return;
    }

    console.log('Dados a serem enviados:', this.clientForm.value);

    this.clientsService.createClient(this.clientForm.value).subscribe({
      next: (novoCliente) => {
        console.log('Cliente criado com sucesso!', novoCliente);
        this.router.navigate(['/clients']);
      },
      error: (err) => {
        console.error('Erro ao criar cliente:', err);
      },
    });
  }
}
