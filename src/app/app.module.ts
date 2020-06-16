import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import icons from '../assets/svg/svg-icons';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SvgIconsModule.forRoot({
      icons
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
