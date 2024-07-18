import { DataSource } from 'typeorm';

const myDataSource = new DataSource( {
  type: 'mysql',
  host: process.env.DB_HOST || '127.0.0.1',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'restaurant_dev',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  charset: 'utf8mb4',
  synchronize: false,
  entities: process.env.NODE_ENV !== 'production' ? ['**/**.entity.ts'] : ['dist/**/*.entity.js'],
  logging: true,
  migrations: ['src/migrations/*.ts'],
  connectTimeout: 30000,
  acquireTimeout: 30000
});

export default myDataSource;

