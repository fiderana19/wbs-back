import { IsNotEmpty } from 'class-validator';

export class SearchTransactionDto {
  @IsNotEmpty()
  start: Date;

  @IsNotEmpty()
  end: Date;
}
