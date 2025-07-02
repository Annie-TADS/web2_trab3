import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProdutoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  preco: number;
  
  @IsNotEmpty()
  estoque: number;
  
  imagemUrl?: string;
}