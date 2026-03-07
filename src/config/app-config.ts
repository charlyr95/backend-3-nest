export interface AppConfig {
  port: number | string;
  env: string;
}

export interface ConfigModule {
  isGlobal: boolean;
}

export const appConfig: AppConfig = {
  port: process.env.PORT ? Number(process.env.PORT) : 3000,
  env: process.env.NODE_ENV || 'development',
};

export const configModule: ConfigModule = {
  isGlobal: true,
};
