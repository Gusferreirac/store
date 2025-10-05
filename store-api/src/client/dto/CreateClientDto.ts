import { Transform } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsNumberString,
  Length,
} from 'class-validator';

export class CreateClientDto {
  @IsString({ message: 'O nome deve ser uma string.' })
  @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
  name: string;

  @IsEmail({}, { message: 'Por favor, insira um e-mail válido.' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio.' })
  email: string;

  @IsNumberString({}, { message: 'O CPF deve conter apenas números.' })
  @Length(11, 11, { message: 'O CPF deve conter exatamente 11 dígitos.' })
  cpf: string;

  @IsOptional()
  @IsPhoneNumber('BR', {
    message: 'Por favor, insira um número de telefone válido.',
  })
  @Transform(({ value }) => (value === '' ? undefined : value))
  phone?: string;

  @IsOptional()
  @IsString({ message: 'O endereço deve ser uma string.' })
  address?: string;
}
