export type Config = {
  superuser: SuperUserConfig;
  app: AppConfig;
  mysql: MySQLConfig;
  redis: RedisConfig;
  sentry: SentryConfig;
  jwt: JwtConfig;
};

export type SuperUserConfig = {
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
};
