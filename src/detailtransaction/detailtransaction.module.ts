import { Module } from '@nestjs/common';
import { DetailtransactionController } from './detailtransaction.controller';
import { DetailtransactionService } from './detailtransaction.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DetailTransaction,
  DetailTransactionSchema,
} from 'src/schema/detailtransaction.schema';
import { Product, ProductSchema } from 'src/schema/product.schema';
import { Transaction, TransactionSchema } from 'src/schema/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DetailTransaction.name, schema: DetailTransactionSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [DetailtransactionController],
  providers: [DetailtransactionService],
})
export class DetailtransactionModule {}
