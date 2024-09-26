import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TableroComponent } from './components/tablero/tablero.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { LoginComponent } from './components/login/login.component';
import { GestionSociosComponent } from './components/gestion-socios/gestion-socios.component';

export const routes: Routes = [
    { path: '', redirectTo: '/tablero', pathMatch: 'full' },
    { path: 'tablero', component: TableroComponent },  
    {path: 'login',component: LoginComponent},
    {path: 'users/form',component: UsersFormComponent},
    {path: 'socios',component: GestionSociosComponent},
    {path: '**', redirectTo: '/tablero' }, // Ruta de fallback DEBE IR ULTIMA PARA QUE INCLUYA TODAS LAS RUTAS

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes { }