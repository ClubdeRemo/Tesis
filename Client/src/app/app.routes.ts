import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TableroComponent } from './components/tablero/tablero.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
    {path: '',component: TableroComponent},
    {path: 'login',component: LoginComponent},
    {path: 'users/form',component: UsersFormComponent},
    { path: '**', redirectTo: '' } // Ruta de fallback

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes { }