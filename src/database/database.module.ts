import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoConfig } from '../config/mongo-config';

@Global()
@Module({
  imports: [MongooseModule.forRoot(mongoConfig.uri, mongoConfig.config)],
  exports: [MongooseModule],
})
export class DatabaseModule {}
