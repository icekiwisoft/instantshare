import { Component } from '@angular/core';
import { Device } from "@capacitor/device";
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';



@Component({
  selector: 'app-device',
  templateUrl: 'device.page.html',
  styleUrls: ['device.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent],
})

export class DevicePage {
  deviceName!: string;
  deviceModel!: string;
  osVersion!: string;
  platform!: string;
  manufacturer!: string;
  chargingStatus!: string;
  deviceInfo: any;
  batteryLevel!: number;
  memUsed!: number;
  realDiskFree!: number;
  realDiskTotal!: number;
  memoireOC!:number;
  language!: string ;
  serialNumber!: string;
  constructor( ) { }

  async ionViewDidEnter() {
    // Récupérer les informations sur le telephone
    try {
      const info = await Device.getInfo();
      this.deviceName = info.name || 'Unknown';
      this.deviceModel = info.model;
      this.osVersion = `${info.platform} ${info.osVersion}`;
      this.platform = info.platform;
      this.manufacturer = info.manufacturer;
      this.language = navigator.language;
      if (info.memUsed !== undefined) {
        this.memUsed = info.memUsed/1048576;
      }

      if (info.realDiskFree !== undefined) {
        this.realDiskFree = info.realDiskFree/1073741824;
      }
      if (info.realDiskTotal !== undefined) {
        this.realDiskTotal = info.realDiskTotal/1073741824;
      }

      this.memoireOC = this.realDiskTotal - this.realDiskFree;

    } catch (err) {
      console.error('Erreur lors de la récupération des informations sur le dispositif :', JSON.stringify(err));
    }

    // Récupérer le niveau de la batterie
    try {
      const batteryInfo = await Device.getBatteryInfo();
      if (batteryInfo.batteryLevel !== undefined) {
        this.batteryLevel = batteryInfo.batteryLevel * 100;
      }
      this.chargingStatus = batteryInfo.isCharging ? "Charging" : "Not Charging";
    } catch (err) {
      console.error('Erreur lors de la récupération du niveau de la batterie :', JSON.stringify(err));
    }
  }

}