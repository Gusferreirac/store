import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ClientsService } from '../../../services/clients.service';
import { Cliente } from '../../../models/client';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  private router = inject(Router);
  private clientsService = inject(ClientsService);

  displayedColumns: string[] = ['name', 'email', 'phone', 'cpf', 'actions'];
  dataSource = new MatTableDataSource<Cliente>();

  isLoading = true;
  totalElements = 0;
  pageSize = 10;
  pageIndex = 0;

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(page = 1, limit = 10, search = ''): void {
    this.isLoading = true;
    this.clientsService.getClientsPaginated(page, limit, search).subscribe({
      next: (response: any) => {
        this.dataSource.data = response.data;
        this.totalElements = response.total;
        this.pageSize = response.limit;
        this.pageIndex = response.page - 1; // O paginator usa índice 0
        this.isLoading = false;
        console.log('Dados paginados carregados:', response);
      },
      error: (err: any) => {
        console.error('Erro ao carregar clientes:', err);
        this.isLoading = false;
      },
    });
  }

  onPageChange(event: PageEvent): void {
    const page = event.pageIndex + 1;
    const limit = event.pageSize;
    this.loadClients(page, limit);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.loadClients(1, this.pageSize, filterValue.trim().toLowerCase());
  }

  navigateToCreateClient() {
    this.router.navigate(['/clients/create']);
  }

  editClient(client: Cliente) {
    console.log('Editando cliente:', client);
    this.router.navigate(['/clients/edit', client.id]);
  }

  deleteClient(client: Cliente) {
    if (confirm(`Tem certeza que deseja excluir o cliente "${client.name}"?`)) {
      console.log('Excluindo cliente:', client);
      this.clientsService.deleteClient(client.id).subscribe(() => {
        this.loadClients(); // Recarrega a lista após a exclusão
      });
    }
  }
}
