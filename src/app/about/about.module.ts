import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [IonicModule, RouterModule.forChild([{ path: '', component: AboutComponent }])],
  declarations: [AboutComponent],
  exports: [AboutComponent],
})
export class AboutModule {}
