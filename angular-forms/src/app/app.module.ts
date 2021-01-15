import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
// nuget
import { MaterialModule } from './material/material.module';
// components
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { FormsComponent } from './forms/forms.component';
import { BasicFormModule } from './basic-form/basic-form.module';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    FormsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BasicFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
