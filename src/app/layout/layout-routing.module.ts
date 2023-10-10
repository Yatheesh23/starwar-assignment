import { AllCharactersComponent } from './all-characters/all-characters.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { SingleCharactersComponent } from './single-characters/single-characters.component';

const routes: Routes = [{
  path: '', component: LayoutComponent,
  children: [
    {
      path: '',
      component: AllCharactersComponent,
    },
    {
      path: 'characters/:id',
      component: SingleCharactersComponent,
    }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
