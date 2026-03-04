export interface mongoConfig {
  uri: string;
  config: object;
}

export const mongoConfig: mongoConfig = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/mi-app',
  config: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
