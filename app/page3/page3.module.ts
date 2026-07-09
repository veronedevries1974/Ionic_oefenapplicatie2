import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // <-- 1. VOEG CUSTOM_ELEMENTS_SCHEMA TOE
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Page3PageRoutingModule } from './page3-routing.module';
import { Page3Page } from './page3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    Page3PageRoutingModule
  ],
  declarations: [Page3Page],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Page3PageModule {}