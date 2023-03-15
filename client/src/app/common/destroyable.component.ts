import { Component, OnDestroy } from "@angular/core";
import { Subject, Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-destroyable',
  template: ''
})
export abstract class DestroyableComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected preventLeak<T>(observable: Observable<T>) {
    return observable.pipe(takeUntil(this.destroy$));
  }
}