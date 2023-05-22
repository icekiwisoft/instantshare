import { Component, OnInit } from '@angular/core';
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


export class SharePage implements OnInit {
  ngOnInit(): void {}

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
    scanning=false

  bluetoothScanResults: ScanResult[] = [];
  readonly HEART_RATE_SERVICE = numberToUUID(0x180d);
  readonly goProControlAndQueryServiceUUID =
  '0000fea6-0000-1000-8000-00805f9b34fb'.toUpperCase();

  onBluetoothDeviceFound(result: any) {
    console.log('received new scan result', result);
    this.bluetoothScanResults.push(result);
  }

  async scan(): Promise<void> {
    try {

      this.scanning = true

      await BleClient.initialize();

      await BleClient.requestLEScan(
        {
          services: [],

        },

        this.onBluetoothDeviceFound.bind(this)
      );

      setTimeout(async () => {
        await BleClient.stopLEScan();
        this.scanning = false;
        console.log('stopped scanning');
      }, 10000);
    } catch (error) {
      this.scanning = true

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
