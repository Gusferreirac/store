import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './CreateClientDto';

// Esta classe herda todas as validações de CreateClientDto,
// mas torna todos os campos opcionais.
export class UpdateClientDto extends PartialType(CreateClientDto) {}
