import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'mysql',
    url: process.env.DATABASE_URL, // Railway proporciona una URL completa
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    charset: 'utf8mb4',
    logging: true,
});

AppDataSource.initialize()
    .then(() => console.log("📦 Base de datos conectada"))
    .catch(err => console.error("❌ Error al conectar DB:", err));
