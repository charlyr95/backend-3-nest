import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from '../config/mongo-config';

@Global()
@Module({
  imports: [MongooseModule.forRootAsync(mongoConfig)],
  exports: [MongooseModule],
})
export class DatabaseModule {}
