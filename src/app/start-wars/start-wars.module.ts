import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartWarsRoutingModule } from './start-wars-routing.module';
import { StartWarsComponent } from './start-wars.component';

@NgModule({
  declarations: [
    StartWarsComponent,
  ],
  imports: [
    CommonModule,
    StartWarsRoutingModule
  ]
})
export class StartWarsModule { }
