import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard, LoginComponent} from 'mls-auth-login';

const routes: Routes = [
  {path: 'login', canActivate: [AuthGuard], component: LoginComponent},
  {path: 'tokens', canActivate: [AuthGuard], loadChildren: () => import('mls-auth-components').then(m => m.AuthComponentsModule)},
  {path: '', canActivate: [AuthGuard], loadChildren: () => import('mls-coceso-components').then(m => m.CocesoComponentsModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
