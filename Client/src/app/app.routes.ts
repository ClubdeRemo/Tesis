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
import { PagosComponent } from './components/pagos/pagos.component';
import { UsuarioCompletoComponent } from './components/usuario-completo/usuario-completo.component';
import { ManualComponent } from './components/manual/manual.component';
import { HistorialPagosComponent } from './components/historial-pagos/historial-pagos.component';
import { MenuUsuarioComponent } from './components/menu-usuario/menu-usuario.component';
import { WeatherComponent } from './components/weather/weather.component';
import { ReportesUsuarioComponent } from './components/reportes-usuario/reportes-usuario.component';
import { PagoModalComponent } from './components/pago-modal/pago-modal.component';
import { ModificarMensajeComponent } from './components/modificar-mensaje/modificar-mensaje.component';

export const routes: Routes = [
    {path: '', redirectTo: '/tablero', pathMatch: 'full' },
    {path: 'tablero', component: TableroComponent },  
    {path: 'login',component: LoginComponent},
    {path: 'users/form',component: UsersFormComponent},
    {path: 'socios',component: GestionSociosComponent},
    {path: 'historia',component: HistoriaComponent},
    {path: 'reportes', component: ReportesComponent },    
    {path: 'modificar/mensaje/:id',component: ModificarMensajeComponent},
    {path: 'reportes/usuario/', component: ReportesUsuarioComponent },  
    {path: 'menu/admin',component: MenuAdminComponent},
    {path: 'registrar/pago',component: RegistrarPagoComponent},
    {path: 'modificar',component: ModificarComponent},
    {path: 'modificar/:id', component: ModificarComponent },
    {path: 'pagos', component: PagosComponent },
    {path: 'usuario/completo/:id', component: UsuarioCompletoComponent },
    {path: 'manual', component: ManualComponent },
    {path: 'historial/pagos/:UserId', component: HistorialPagosComponent },
    {path: 'menu/usuario/:UserId', component: MenuUsuarioComponent },
    {path: 'clima', component: WeatherComponent },

    {path: '**', redirectTo: '/tablero' }, // Ruta de fallback DEBE IR ULTIMA PARA QUE INCLUYA TODAS LAS RUTAS

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutes { }