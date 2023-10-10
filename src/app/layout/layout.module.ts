import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { AllCharactersComponent } from './all-characters/all-characters.component';
import { SingleCharactersComponent } from './single-characters/single-characters.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    AllCharactersComponent,
    SingleCharactersComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgxPaginationModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class LayoutModule { }
