import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ConcernListComponent, ConcernOverviewComponent, EditComponent, MainComponent} from './components';
import {StaffListComponent} from './components/staff/staff-list/staff-list.component';
import {ConcernDataService} from './services';

const routes: Routes = [
  {
    path: 'concerns',
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
  {
    path: 'staff',
    component: StaffListComponent
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
