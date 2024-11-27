import * as process from 'node:process';

import { Config } from './config.type';

export default (): Config => ({
  superuser: {
    name: process.env.SUPER_USER_NAME,
    surname: process.env.SUPER_USER_SURNAME,
    email: process.env.SUPER_USER_EMAIL,
    password: process.env.SUPER_USER_PASSWORD,
  },
  app: {
    port: Number(process.env.APP_PORT) || 3000,
    host: process.env.APP_HOST || 'localhost',
  },
  mysql: {
    port: Number(process.env.MY_SQL_PORT),
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    dbName: process.env.MY_SQL_DB,
  },
  redis: {
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    env: process.env.SENTRY_ENV,
    debug: process.env.SENTRY_DEBUG === 'true',
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiresIn: Number(process.env.JWT_ACCESS_EXPIRES_IN),
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: Number(process.env.JWT_REFRESH_EXPIRES_IN),
  },
});
