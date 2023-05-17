import { Component } from '@angular/core';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { BleClient, ScanResult, numberToUUID } from '@capacitor-community/bluetooth-le';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab2',
  templateUrl: 'share.page.html',
  styleUrls: ['share.page.scss'],
  standalone: true,
  imports: [IonicModule, ExploreContainerComponent,CommonModule]
})

export class SharePage {

  constructor(public actionSheetController: ActionSheetController) { }


  bluetoothScanResults: ScanResult[] = [];
  readonly HEART_RATE_SERVICE = numberToUUID(0x180d);

  onBluetoothDeviceFound(result:any) {
    console.log('received new scan result', result);
    this.bluetoothScanResults.push(result);
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
