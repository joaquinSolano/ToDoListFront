import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotespageComponent } from './components/notespage/notespage.component';
import { NotespageListarComponent } from './components/notespage/notespage-listar/notespage-listar.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { NotespageRegistrarComponent } from './components/notespage/notespage-registrar/notespage-registrar.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'notes',
        component:NotespageListarComponent,
        canActivate: [seguridadGuard],
    },
    {
        path:'insertnotes',
        component:NotespageRegistrarComponent,
        canActivate:[seguridadGuard]
    }

];
