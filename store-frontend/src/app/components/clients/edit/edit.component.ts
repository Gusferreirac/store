import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatHint } from '@angular/material/form-field';
import { ClientsService } from '../../../services/clients.service';
import { UpdateClientDto } from '../../../models/client';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatHint,
  ],
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  // Injeção de dependências
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private clientsService = inject(ClientsService);

  clientForm: FormGroup;
  clientId: string | null = null;
  isLoading = true;

  constructor() {
    this.clientForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required]],
      phone: [''],
      address: [''],
    });
  }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id');

    if (this.clientId) {
      this.clientsService.getClientById(this.clientId).subscribe({
        next: (clientData) => {
          this.clientForm.patchValue(clientData);
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erro ao buscar cliente:', err);
          this.isLoading = false;
          this.router.navigate(['/clients']); 
        },
      });
    } else {
      this.router.navigate(['/clients']);
    }
  }

  onSubmit(): void {
    this.clientForm.markAllAsTouched();
    if (this.clientForm.invalid || !this.clientId) {
      return;
    }

    const updatedData: UpdateClientDto = this.clientForm.value;

    this.clientsService.updateClient(this.clientId, updatedData).subscribe({
      next: (updatedClient) => {
        console.log('Cliente atualizado com sucesso!', updatedClient);
        this.router.navigate(['/clients']);
      },
      error: (err) => {
        console.error('Erro ao atualizar cliente:', err);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/clients']);
  }
}