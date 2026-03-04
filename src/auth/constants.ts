import { jwtConfig } from '../config/jwt-config';

export const jwtConstants = {
  secret: jwtConfig.secret.access || 'your_secret_key_here',
  refreshSecret: jwtConfig.secret.refresh || 'your_refresh_secret_key_here',
};
