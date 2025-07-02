import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFinancaDto {
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNotEmpty()
  @IsNumber()
  valor: number;
}