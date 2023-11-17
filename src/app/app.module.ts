import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiHttpService } from './service/api-http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbAccordionModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [ApiHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
