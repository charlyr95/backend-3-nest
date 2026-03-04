export const jwtConstants: Record<string, string> = {
  access_secret: process.env.ACCESS_SECRET || 'your_secret_key_here',
  refresh_secret: process.env.REFRESH_SECRET || 'your_refresh_secret_key_here',
};
