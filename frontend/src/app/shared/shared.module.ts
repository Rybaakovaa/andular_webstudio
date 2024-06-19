import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";
import { PreparePhonePipe } from './pipes/prepare-phone.pipe';



@NgModule({
  declarations: [

    PreparePhonePipe
  ],
    imports: [
        CommonModule,
        RouterOutlet
    ],
  exports: [
    PreparePhonePipe
  ]
})
export class SharedModule { }
