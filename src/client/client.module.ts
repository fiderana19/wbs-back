import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from 'src/schema/client.schema';
import { Transaction, TransactionSchema } from 'src/schema/transaction.schema';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [ClientController],
  providers: [ClientService, JwtService],
})
export class ClientModule {}
