import { Component, OnInit } from '@angular/core';
import { DummyFacade } from './dummy/+state/dummy.facade';
import { Observable } from 'rxjs';
import { Dictionary } from '@ngrx/entity';
import { DummyEntity } from './dummy/+state/dummy.models';

@Component({
  selector: 'demo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo';
  entities$: Observable<Dictionary<DummyEntity>>;
  selected$: Observable<DummyEntity>;
  counter = 0;
  inputId: string;

  constructor(private dummyState: DummyFacade) {}

  ngOnInit() {
    this.entities$ = this.dummyState.dummyEntities$;
    this.selected$ = this.dummyState.selectedDummy$;
  }

  addRec() {
    this.dummyState.dispatch(
      this.dummyState.dummyActions.updateItem({
        item: { id: this.inputId, title: 'some title ' + this.counter },
      })
    );
    this.counter++;
  }

  select() {
    this.dummyState.dispatch(
      this.dummyState.dummyActions.setSelected({ selectedId: this.inputId })
    );
  }
}
