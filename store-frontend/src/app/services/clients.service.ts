import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, CreateClientDto, UpdateClientDto } from '../models/client';
import { environment } from '../../environments/environment';
import { PaginatedResponse } from '../models/PaginatedResponse';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private apiUrl = `${environment.apiUrl}/clients`;

  constructor(private http: HttpClient) {}

  getClients(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getClientsPaginated(
    page: number,
    limit: number,
    search?: string
  ): Observable<PaginatedResponse<Cliente>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PaginatedResponse<Cliente>>(this.apiUrl, { params });
  }

  getClientById(id: string): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(url);
  }

  createClient(clientData: CreateClientDto): Observable<Cliente> {
    return this.http.post<Cliente>(this.apiUrl, clientData);
  }

  updateClient(id: string, clientData: UpdateClientDto): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<Cliente>(url, clientData);
  }

  deleteClient(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
