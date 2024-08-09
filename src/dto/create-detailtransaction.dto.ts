import { IsNotEmpty } from 'class-validator';
import { Product } from 'src/schema/product.schema';
import { Transaction } from 'src/schema/transaction.schema';

export class CreateDetailTransactionDto {
  @IsNotEmpty()
  quantite: number;

  @IsNotEmpty()
  remise: number;

  @IsNotEmpty()
  product: Product;

  @IsNotEmpty()
  transaction: Transaction;
}
