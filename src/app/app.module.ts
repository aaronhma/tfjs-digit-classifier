import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { DrawableDirective } from './draw/drawable.directive';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  imports: [BrowserModule, ChartsModule],
  declarations: [AppComponent, DrawableDirective, ChartComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
