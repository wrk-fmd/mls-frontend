import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {UnitTokenConcernsComponent, UnitTokenListComponent} from './components';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: UnitTokenConcernsComponent},
      {path: ':concernId', component: UnitTokenListComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
