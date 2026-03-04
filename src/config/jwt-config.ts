export interface JwtSecret {
  access: string;
  refresh: string;
}

export interface JwtConfig {
  secret: JwtSecret;
  signOptions: object;
}

export const jwtConfig: JwtConfig = {
  secret: {
    access: process.env.ACCESS_SECRET || 'your_secret_key_here',
    refresh: process.env.REFRESH_SECRET || 'your_refresh_secret_key_here',
  },
  signOptions: {
    expiresIn: process.env.JWT_EXPIRES_IN || '60s', // Adjust expiration as needed
  },
};
