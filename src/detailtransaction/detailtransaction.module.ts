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
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: DetailTransaction.name, schema: DetailTransactionSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [DetailtransactionController],
  providers: [DetailtransactionService, JwtService],
})
export class DetailtransactionModule {}
