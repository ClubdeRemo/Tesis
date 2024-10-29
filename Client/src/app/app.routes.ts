import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { TableroComponent } from './components/tablero/tablero.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { LoginComponent } from './components/login/login.component';
import { GestionSociosComponent } from './components/gestion-socios/gestion-socios.component';
import { HistoriaComponent } from './components/historia/historia.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { MenuAdminComponent } from './components/menu-admin/menu-admin.component';
import { RegistrarPagoComponent } from './components/registrar-pago/registrar-pago.component';
import { ModificarComponent } from './components/modificar/modificar.component';

export const routes: Routes = [
    {path: '', redirectTo: '/tablero', pathMatch: 'full' },
    {path: 'tablero', component: TableroComponent },  
    {path: 'login',component: LoginComponent},
    {path: 'users/form',component: UsersFormComponent},
    {path: 'socios',component: GestionSociosComponent},
    {path: 'historia',component: HistoriaComponent},
    {path: 'reportes',component: ReportesComponent},
    {path: 'menu/admin',component: MenuAdminComponent},
    {path: 'registrar/pago',component: RegistrarPagoComponent},
    {path: 'modificar',component: ModificarComponent},
    {path: '**', redirectTo: '/tablero' }, // Ruta de fallback DEBE IR ULTIMA PARA QUE INCLUYA TODAS LAS RUTAS

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes { }