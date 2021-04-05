import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

/* Views */
import DashboardComponent from '../views/dashboard/dashboard.component';
import LoginComponent from 'src/views/login/login.component';
import { SandboxComponent } from 'src/views/sandbox/sandbox.component';

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthService],
    },
    { path: 'sandbox', component: SandboxComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export default class RoutingModule {}
