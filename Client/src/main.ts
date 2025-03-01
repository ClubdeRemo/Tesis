import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// Aqui hacemos el boostraping, que es hacer que corra angular y le decimos cual es el componente principal de la aplicacion
// En este caso AppComponent