import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  nom_client: string;

  @IsNotEmpty()
  adresse_client: string;

  @IsOptional()
  mail_client: string;

  @IsNotEmpty()
  telephone_client: string;
}
