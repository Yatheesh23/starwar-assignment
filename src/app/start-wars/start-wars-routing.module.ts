import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartWarsComponent } from './start-wars.component';

const routes: Routes = [{ path: '', component: StartWarsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartWarsRoutingModule { }
