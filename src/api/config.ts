import dotenv from 'dotenv';

dotenv.config();

export const SERVER_NAME = process.env.SERVER_NAME || 'Default Server';
