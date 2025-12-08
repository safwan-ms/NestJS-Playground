import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';
import * as path from 'path';

export default (): PostgresConnectionOptions => ({
  type: 'postgres',
  url: process.env.url,
  port: Number(process.env.portt),
  database: 'neondb',
  entities: [path.resolve(__dirname, '..') + '/**/*.entity{.ts,.js}'],
  synchronize: false,
});
