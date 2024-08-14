import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

export const PORT = process.env.PORT;
export const mongoDBurl = process.env.MONGODB_URL;
