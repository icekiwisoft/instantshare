import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from '../explore-container/explore-container.component';

import { SharePage } from './share.page';

describe('SharePage', () => {
  let component: SharePage;
  let fixture: ComponentFixture<SharePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharePage, IonicModule, ExploreContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
