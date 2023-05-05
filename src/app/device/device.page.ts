import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
  selector: 'app-tab3',
  templateUrl: 'device.page.html',
  styleUrls: ['device.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})
export class DevicePage {
  constructor() {}
}
