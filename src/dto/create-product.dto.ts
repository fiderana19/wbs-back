import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  libelle: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  pu: number;
}
