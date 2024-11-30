import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Debug environment variables
console.log('Database Config:', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export class Database {
  private static instance: Sequelize | null = null;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!Database.instance) {
      Database.instance = new Sequelize(
        process.env.DB_NAME!, 
        process.env.DB_USER!, 
        process.env.DB_PASSWORD, 
        {
          host: process.env.DB_HOST,
          dialect: 'mysql',
          pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
        }
      );
    }
    return Database.instance;
  }

  public static async testConnection(): Promise<void> {
    try {
      await Database.getInstance().authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', (error as Error).message);
    }
  }
}
