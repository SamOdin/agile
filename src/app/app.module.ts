import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FileComponent, ControlPanelComponent, HeaderComponent, FooterComponent, HoverComponent } from './components';
import { TextService, DatamuseService, HoverService } from './services';
import { HoverTextDirective } from './directives';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RootStoreModule } from './store';
import { InterceptorsModule, InterceptorConfig } from './services';

@NgModule({
  declarations: [
    AppComponent,
    FileComponent,
    ControlPanelComponent,
    HeaderComponent,
    FooterComponent,
    HoverTextDirective,
    HoverComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RootStoreModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    InterceptorsModule.forRoot(InterceptorConfig)
  ],
  providers: [
    TextService, DatamuseService, HoverService
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [HoverComponent]
})
export class AppModule {
}
