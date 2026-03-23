import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { TransactionModule } from './transaction/transaction.module';
import { ProductModule } from './product/product.module';
import { DetailtransactionModule } from './detailtransaction/detailtransaction.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    CacheModule.register({
      ttl: 1000 * 60,
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 1000 * 10,
          limit: 10,
        },
      ],
    }),
    ClientModule,
    TransactionModule,
    ProductModule,
    DetailtransactionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
    ,{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ],
})
export class AppModule {}
