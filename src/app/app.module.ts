import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SvgIconsModule, fromSvgProps } from '@ngneat/icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import * as icons from '../assets/svg/my-icons.model';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SvgIconsModule.forRoot({
      icons: fromSvgProps(icons)
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
