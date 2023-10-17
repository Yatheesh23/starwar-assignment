import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SinleCharacterComponent } from './sinle-character/sinle-character.component';
import { AppComponent } from './app.component';
import { FiltersComponent } from './filters/filters.component';
const routes: Routes = [
  {
    path: '',
    component: FiltersComponent,
  },
  {
    path: 'characters/:id',
    component: SinleCharacterComponent,

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
