import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from 'mls-auth-api';
import {LoginComponent} from 'mls-common';

const routes: Routes = [
  {path: 'login', canActivate: [AuthGuard], component: LoginComponent},
  {path: 'tokens', canActivate: [AuthGuard], loadChildren: () => import('mls-auth-components').then(m => m.AuthComponentsModule)},
  {path: '**', redirectTo: 'tokens'} // TODO Create a proper landing page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
