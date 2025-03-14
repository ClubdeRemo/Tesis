import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Definir las configuraciones para local y producción
const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
    type: 'mysql',
    url: isProduction ? process.env.DATABASE_URL : undefined, 
    host: isProduction ? undefined : 'localhost',
    port: isProduction ? undefined : 30532,
    username: isProduction ? undefined : 'root',
    password: isProduction ? undefined : 'root',
    database: isProduction ? undefined : 'club_de_remo',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    charset: 'utf8mb4',
    synchronize: true, 
    logging: true,
});

// Inicializar conexión manualmente si es necesario
AppDataSource.initialize()
    .then(() => console.log("📦 Base de datos conectada"))
    .catch(err => console.error("❌ Error al conectar DB:", err));
