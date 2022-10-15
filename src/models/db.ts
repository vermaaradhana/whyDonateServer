import mongoose from 'mongoose';
import config from 'config';
import { DBConfigInterface } from '../interface/db_config_interface';
// const dbConfig: DBConfigInterface = config.get('DBConfig');
// Create a new express app instance
//TODO: Handle error always remember
export const db = async (): Promise<void> => {
  try {
    // console.log(`mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`);
    // await mongoose.connect(`mongodb://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`,
    mongoose.connect('mongodb://localhost:27017/whyDonate', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.log('error -- ', error);
    throw new Error('Error in connecting to database');
  }
};
