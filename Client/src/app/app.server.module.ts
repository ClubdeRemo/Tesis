import { provideServerRendering } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';

export const bootstrap = () =>
  bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [provideServerRendering()],
  });

bootstrap().catch((err) => console.error(err));
