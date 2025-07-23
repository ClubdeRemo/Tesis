import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();


export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'dpg-d1sljivgi27c739gn1b0-a.oregon-postgres.render.com',
    port: 5432,
    username: 'club_remo_db_user',
    password: 'l6mdamWYqP4heH5fFQyEADNKGp6mlNRF',
    database: 'club_remo_db',
    ssl: {
    rejectUnauthorized: false, // <- Necesario para Render
    },
    entities: [__dirname + '/**//*.entity{.ts,.js}'],
    logging: true,
}); // PARA POSTGRE SQL RENDER 

/* export const AppDataSource = new DataSource({
    type: 'mysql',
    url: process.env.DATABASE_URL, // Railway proporciona una URL completa
    entities: [__dirname + '/**//*.entity{.ts,.js}'],
    charset: 'utf8mb4',
    logging: true,
}); */// PARA MYSQL Railway

AppDataSource.initialize()
    .then(() => console.log("📦 Base de datos conectada"))
    .catch(err => console.error("❌ Error al conectar DB:", err));
