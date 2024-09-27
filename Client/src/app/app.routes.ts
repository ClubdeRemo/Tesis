import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

//importar todos los componentes
import { TableroComponent } from './components/tablero/tablero.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { LoginComponent } from './components/login/login.component';
import { GestionSociosComponent } from './components/gestion-socios/gestion-socios.component';


export const routes: Routes = [    //difinicion de rutas en url(patch)  
    {path: '',component: TableroComponent}, // la ruta vacia es la predeterminada (raiz)
    {path: 'login',component: LoginComponent},
    {path: 'users/form',component: UsersFormComponent},
    {path: 'socios',component: GestionSociosComponent},
    {path: '**', redirectTo: '' }, // Ruta de fallback DEBE IR ULTIMA PARA QUE INCLUYA TODAS LAS RUTAS

];
@NgModule({   //define un modulo de angular, solo se aplica una vez
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes { }