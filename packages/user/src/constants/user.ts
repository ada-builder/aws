export const JWT_SECRET = process.env.JWT_SECRET ?? 'lamlamlam';

export const USERS_TABLE = 'Users' as const;
export const USER_PROVIDERS_TABLE = 'UserProviders' as const;

export const USER_REPORTS_INDEX = 'user-reports-index' as const;
export const USERS_EMAIL_INDEX = 'email-index' as const;
