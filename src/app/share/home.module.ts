import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [IonicModule, RouterModule.forChild([{ path: '', component: HomeComponent }])],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
