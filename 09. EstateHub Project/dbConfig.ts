import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';

export const pgConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url: 'postgresql://neondb_owner:npg_6bTLGpUwfM4J@ep-wispy-wave-adm90y2q-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  port: 5432,
  database: 'neondb',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
