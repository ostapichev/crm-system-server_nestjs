export type Config = {
  superuser: UserConfig;
  app: AppConfig;
  mysql: MySQLConfig;
  redis: RedisConfig;
  sentry: SentryConfig;
  jwt: JwtConfig;
};

export type UserConfig = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export type AppConfig = {
  port: number;
  host: string;
};

export type MySQLConfig = {
  port: number;
  host: string;
  user: string;
  password: string;
  dbName: string;
};

export type RedisConfig = {
  port: number;
  host: string;
  password: string;
};

export type SentryConfig = {
  dsn: string;
  env: string;
  debug: boolean;
};

export type JwtConfig = {
  accessSecret: string;
  accessExpiresIn: number;
  refreshSecret: string;
  refreshExpiresIn: number;
  activateSecret: string;
  activateExpiresIn: number;
};
