import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

import { NavbarComponent } from './navbar/navbar.component'

@NgModule({
  imports: [CommonModule, FormsModule,  RouterModule],
  exports: [CommonModule, FormsModule,  RouterModule, NavbarComponent],
  declarations: [NavbarComponent]
})
export class SharedModule { }
