export const appConfig: Record<string, string> = {
  port: process.env.PORT || '3000',
  env: process.env.NODE_ENV || 'development',
};

export const configModule = {
  isGlobal: true,
  load: [() => appConfig],
};
