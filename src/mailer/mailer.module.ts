import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailController } from './mailer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DetailTransaction,
  DetailTransactionSchema,
} from 'src/schema/detailtransaction.schema';
import { Transaction, TransactionSchema } from 'src/schema/transaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DetailTransaction.name, schema: DetailTransactionSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [MailController],
  providers: [MailerService],
})
export class MailerModule {}
