import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from './root-reducer';
import { TextEffects } from './root-effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('app', reducer),
    EffectsModule.forFeature([TextEffects]),
  ]
})
export class RootStoreModule {}
