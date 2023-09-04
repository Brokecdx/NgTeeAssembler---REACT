import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgTeeAssemblerModule } from 'ng-tee-assembler';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgTeeAssemblerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
