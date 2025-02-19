import 'zone.js/node';
const express = require('express');  // Cambio a CommonJS
import { existsSync } from 'fs';
import { join } from 'path';
import bootstrap from './main.server';  // Asegúrate de que la ruta sea correcta
import { Request, Response, NextFunction } from 'express';  // Importamos los tipos

const app = express();
const PORT = process.env['PORT'] || 4000;  // Puedes configurar el puerto como desees
const DIST_FOLDER = join(process.cwd(), 'dist/client/browser');  // Ruta donde se sirven los archivos estáticos
const INDEX_HTML = existsSync(join(DIST_FOLDER, 'index.original.html'))
  ? 'index.original.html'  // Usa un archivo de índice original si existe
  : 'index.html';  // Si no, usa el índice por defecto

// Servir archivos estáticos desde la carpeta de dist
app.use(express.static(DIST_FOLDER, { maxAge: '1y' }));

// Middleware para renderizar la aplicación Angular en SSR
app.get('*', async (req: Request, res: Response, next: NextFunction) => {  // Aquí añadimos los tipos
  try {
    await bootstrap();  // Llama a la función bootstrap que inicializa la aplicación
    res.sendFile(join(DIST_FOLDER, INDEX_HTML));  // Envia el archivo HTML de la aplicación
  } catch (err) {
    next(err);  // Si ocurre un error, lo pasa al siguiente middleware
  }
});

// Inicia el servidor en el puerto configurado
app.listen(PORT, () => {
  console.log(`Servidor SSR corriendo en http://localhost:${PORT}`);
});
