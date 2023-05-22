import { Component, OnInit } from '@angular/core';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { BleClient, ScanResult, numberToUUID} from '@capacitor-community/bluetooth-le';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab2',
  templateUrl: 'share.page.html',
  styleUrls: ['share.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent, CommonModule]
})


export class SharePage implements OnInit {
  ngOnInit(): void {
  }
readonly HEART_RATE_SERVICE = numberToUUID(0x180d);

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

  onBluetoothDeviceFound(result: any) {
    console.log('received new scan result', result);
    this.bluetoothScanResults.push(result);
  }

  s:any

  async scan(): Promise<void> {
    try {
      await BleClient.initialize()


      await BleClient.enable()
      this.scanning = true


      await BleClient.requestLEScan(
        {
          services:[this.HEART_RATE_SERVICE],
          allowDuplicates:false
        },
        (result) =>
        {
          this.s=result


  }
      );

      setTimeout(async () => {
        await BleClient.stopLEScan();
        this.scanning = false;
        console.log('stopped scanning');
      }, 20000);
    } catch (error) {
      this.scanning = true
        window.alert("erreur")
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
