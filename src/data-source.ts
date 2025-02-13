import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/**/*.entity.js'], // Use "dist" for compiled files
  migrations: ['dist/migrations/*.js'], // Use "dist" for compiled files
  synchronize: false, // Ensure migrations handle schema updates
  logging: true,
});

export default AppDataSource;
