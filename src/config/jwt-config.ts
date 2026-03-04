export interface JwtConfig {
  secret_key: string;
  refresh_key: string;
  signOptions: object;
}

export const jwtConfig: JwtConfig = {
  secret_key: process.env.JWT_SECRET || 'your_secret_key_here',
  refresh_key: process.env.JWT_REFRESH || 'your_refresh_secret_key_here',
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN || '60s', // Adjust expiration as needed
  },
};
