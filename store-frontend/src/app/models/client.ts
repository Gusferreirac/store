export interface Cliente {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cpf: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateClientDto {
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  address?: string;
}

export interface UpdateClientDto {
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
  address?: string;
}
