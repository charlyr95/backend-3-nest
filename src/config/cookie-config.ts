export interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'lax' | 'none';
  maxAge: number;
}

export interface CookieConfig {
  name: string;
  options: CookieOptions;
}

export const cookieOptions: Record<string, CookieConfig> = {
  access: {
    name: 'access_token',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: process.env.ACCESS_TOKEN_MAX_AGE
        ? Number(process.env.ACCESS_TOKEN_MAX_AGE)
        : 12 * 60 * 60 * 1000, // 12 hours
    },
  },
  refresh: {
    name: 'refresh_token',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: process.env.REFRESH_TOKEN_MAX_AGE
        ? Number(process.env.REFRESH_TOKEN_MAX_AGE)
        : 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  },
};
