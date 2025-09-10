// Intended for Riseact developers only
export const IS_INTERNAL_DEV = process.env.RISEACT_ACCOUNTS_URL?.includes('localhost') || false;

/* ---------------------------------- Auth ---------------------------------- */

export const DEFAULT_RISEACT_ACCOUNTS_URL = 'https://accounts.riseact.org';
export const DEFAULT_RISEACT_CORE_URL = 'https://core.riseact.org';

export const RISEACT_ACCOUNTS_URL = process.env.RISEACT_ACCOUNTS_URL || DEFAULT_RISEACT_ACCOUNTS_URL;
export const RISEACT_CORE_URL = process.env.RISEACT_CORE_URL || DEFAULT_RISEACT_CORE_URL;

export const RISEACT_GQL_ENDPOINT = '/admin/graphql/';
export const OAUTH_REDIRECT_URI = '/oauth/callback';
export const RISEACT_ORGANIZATION_HEADER = 'X-Riseact-Organization';

/* ---------------------------------- Store --------------------------------- */

export const FILESTORE_NAME = 'credentials.json';

/* --------------------------------- Server --------------------------------- */

export const APP_PORT = 3000;
export const APP_HOST = `http://localhost:${APP_PORT}`;

/* ------------------------------- Development ------------------------------ */

export const HMR_PORT = 3030;
export const HMR_CLIENT_PORT = IS_INTERNAL_DEV ? 3031 : 443;

export const HMR_HOST = `http://localhost:${HMR_PORT}`;
export const FRONTEND_SRC_PATH = 'src/frontend';
