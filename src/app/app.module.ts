import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SvgIconsModule } from '@ngneat/svg-icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { missingIcon } from './svg/missing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SvgIconsModule.forRoot({
      defaultSize: 'md',
      missingIcon: missingIcon,
      sizes: {
        sm: '16px',
        md: '32px',
        lg: '64px'
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
