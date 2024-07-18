// require('dotenv').config();
declare const process: {
  env: {
    [key: string]: string | undefined
  }
};

import 'reflect-metadata';
import logger from './configs/logger.config';
import app from './configs/express.config';
import { myDataSource } from '../app-data-source';

const PORT = process.env.PORT || 5000;

const connect = async () => {
  try {
    await myDataSource.initialize(); // Inicjalizuj połączenie
    await myDataSource.runMigrations(); // Uruchom migracje
    logger.info('Connected to database successfully');
    app.listen(PORT, () => {
      logger.info(`Server running at ${PORT}`);
    });
  } catch (e) {
    logger.error(`The connection to database failed with error: ${e}`);
  }
}

connect();
