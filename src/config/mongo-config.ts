import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongoConfig: MongooseModuleAsyncOptions = {
  useFactory: () => ({
    uri: process.env.MONGO_URL || 'mongodb://localhost:27017/mi-app',
    dbName: process.env.DB_NAME || 'mi-app',
  }),
};
