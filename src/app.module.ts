import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { TransactionModule } from './transaction/transaction.module';
import { ProductModule } from './product/product.module';
import { DetailtransactionModule } from './detailtransaction/detailtransaction.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/gcaissewbs'),
    ClientModule,
    TransactionModule,
    ProductModule,
    DetailtransactionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
