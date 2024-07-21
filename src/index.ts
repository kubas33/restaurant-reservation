import 'reflect-metadata';
import dotenv from 'dotenv';
import { logger } from 'configs/logger.config';
import { AppDataSource } from 'configs/app-data-source';
import { app } from 'configs/express.config';

dotenv.config();


const PORT = process.env.PORT || 5000;

const connect = async () => {
  try {
    await AppDataSource.initialize(); // Inicjalizuj połączenie
    await AppDataSource.runMigrations(); // Uruchom migracje
    logger.info('Connected to database successfully');
    app.listen(PORT, () => {
      logger.info(`Server running at ${PORT}`);
    });
  } catch (e) {
    logger.error(`The connection to database failed with error: ${e}`);
  }
}

connect();
