import { jwtConfig } from '../config/jwt-config';

export const jwtConstants = {
  secret: jwtConfig.secret_key || 'your_secret_key_here',
  refreshKey: jwtConfig.refresh_key || 'your_refresh_secret_key_here',
};
