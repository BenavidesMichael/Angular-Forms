import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// nuget
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
// components
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
//modules
import { BasicFormModule } from './basic-form/basic-form.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    BasicFormModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
