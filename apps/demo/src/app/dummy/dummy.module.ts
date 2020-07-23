import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDummy from './+state/dummy.reducer';
import { DummyEffects } from './+state/dummy.effects';
import { DummyFacade } from './+state/dummy.facade';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromDummy.DUMMY_FEATURE_KEY, fromDummy.reducer),
    EffectsModule.forFeature([DummyEffects]),
  ],
  providers: [DummyFacade],
})
export class DummyModule {}
