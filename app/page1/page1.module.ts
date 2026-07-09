import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; // <-- 1. VOEG CUSTOM_ELEMENTS_SCHEMA TOE
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Page1PageRoutingModule } from './page1-routing.module';
import { Page1Page } from './page1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, 
    Page1PageRoutingModule
  ],
  declarations: [Page1Page],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Page1PageModule {}