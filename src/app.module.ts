import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

import { ConfigModule } from '@nestjs/config';
import { configModule } from './config/app-config';

@Module({
  imports: [
    ConfigModule.forRoot(configModule),
    CommonModule,
    DatabaseModule,
    ProductsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
