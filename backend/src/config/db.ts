import mongoose from 'mongoose';
import { config } from './env';
import { DB_NAME } from '../constant';

export async function connectDB(): Promise<void> {
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      dbName: DB_NAME,
    });
    console.log(`📦 MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

export async function disconnectDB(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  } catch (error) {
    console.error('Error disconnecting MongoDB:', error);
  }
}
