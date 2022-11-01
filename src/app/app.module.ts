import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideSvgIconsConfig } from '@ngneat/svg-icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { missingIcon } from './svg/missing';

@NgModule({
  declarations: [AppComponent],
  providers: [
    provideSvgIconsConfig({
      defaultSize: 'md',
      missingIconFallback: missingIcon,
      sizes: {
        sm: '16px',
        md: '32px',
        lg: '64px',
      },
    }),
  ],
  imports: [BrowserModule, AppRoutingModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
