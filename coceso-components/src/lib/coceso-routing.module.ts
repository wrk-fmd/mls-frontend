import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from 'mls-auth-api';
import {ConcernListComponent, ConcernOverviewComponent, EditComponent, MainComponent} from './components';
import {ConcernDataService} from './services';

const routes: Routes = [
  {
    path: 'concerns',
    canActivate: [AuthGuard],
    children: [
      {path: '', component: ConcernListComponent},
      {
        path: ':concernId',
        resolve: {concern: ConcernDataService},
        children: [
          {path: '', component: ConcernOverviewComponent},
          {path: 'edit', component: EditComponent},
          {path: 'main', component: MainComponent},
          {path: '**', redirectTo: ''}
        ]
      }
    ]
  },
  {path: '**', redirectTo: 'concerns'}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CocesoRoutingModule {
}
