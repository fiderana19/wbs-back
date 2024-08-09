import { IsNotEmpty } from 'class-validator';
import { Client } from 'src/schema/client.schema';

export class CreateTransactionDto {
  @IsNotEmpty()
  date_transaction: Date;

  @IsNotEmpty()
  client: Client;
}
