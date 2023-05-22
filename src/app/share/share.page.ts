import { Component } from '@angular/core';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { BleClient, ScanResult, numberToUUID } from '@capacitor-community/bluetooth-le';
import { Device } from "@capacitor/device";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab2',
  templateUrl: 'share.page.html',
  styleUrls: ['share.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule]
})

export class SharePage {

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
  memoireOC!: number;
  language!: string;
  serialNumber!: string;

  constructor(public actionSheetController: ActionSheetController) { }


  bluetoothScanResults: ScanResult[] = [];
  readonly HEART_RATE_SERVICE = numberToUUID(0x180d);

  onBluetoothDeviceFound(result: any) {
    console.log('received new scan result', result);
    this.bluetoothScanResults.push(result);
  }


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
        this.memUsed = info.memUsed / 1048576;
      }

      if (info.realDiskFree !== undefined) {
        this.realDiskFree = info.realDiskFree / 1073741824;
      }
      if (info.realDiskTotal !== undefined) {
        this.realDiskTotal = info.realDiskTotal / 1073741824;
      }

      this.memoireOC = this.realDiskTotal - this.realDiskFree;

    } catch (err) {
      console.error('Erreur lors de la récupération des informations sur le dispositif :', JSON.stringify(err));
    }

  }



  async scan(): Promise<void> {


    try {
      await BleClient.initialize();

      await BleClient.requestLEScan(
        {
          services: [this.HEART_RATE_SERVICE],

        },
        (result) => {
          this.onBluetoothDeviceFound.bind(result)
        }
      );

      setTimeout(async () => {
        await BleClient.stopLEScan();
        console.log('stopped scanning');
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Settings',
      buttons: [
        {
          text: 'déconnecter',
          role: 'destructive',
          handler: () => { console.log('delete clicked'); }
        },
        {
          text: 'oublier',
          icon: 'trash',
          handler: () => { console.log('share clicked'); }
        },
        {
          text: 'Partager',
          icon: 'share',
          handler: () => { console.log('play clicked'); }
        }
      ]
    });
    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }




}
