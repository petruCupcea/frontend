import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent, detach, SelectableCollectionService, SELECTABLE_STATUS_PENDING } from 'common/core';


@Component({
  selector: 'selectable-item',
  templateUrl: './selectable.component.html',
})
export class SelectableComponent extends BaseComponent {

  @Input() indeterminate: boolean;
  @Input() selectedItem: any;

  private selectableStatus: Subscription;


  constructor(readonly selectableCollection: SelectableCollectionService) {
    super();
  }


  selectAllItems(selection) {
    if (this.selectableCollection.status.value === SELECTABLE_STATUS_PENDING) {
      this.waitForStatus(() => {
        this.selectAllItems(selection);
      });

      return;
    }
    detach(() => {
      if (selection.checked && !selection.indeterminate) {
        this.selectableCollection.addItems(this.selectedItem);
      } else if (!selection.indeterminate) {
        this.selectableCollection.removeItems();
      }
    });
  }


  selectSingleItem(selection) {
    if (this.selectableCollection.status.value === SELECTABLE_STATUS_PENDING) {
      this.waitForStatus(() => {
        this.selectSingleItem(selection);
      });

      return;
    }

    if (selection.checked) {
      this.selectableCollection.addItem(this.selectedItem);
    } else {
      this.selectableCollection.removeItem(this.selectedItem);
    }
  }


  checkForPreselect(): boolean {
    return (!!this.selectableCollection.getItemById(this.selectedItem.id));
  }


  waitForStatus(callback: () => void) {
    if (this.selectableStatus) {
      return;
    }

    this.selectableStatus = this.selectableCollection.status.asObservable()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((status: any) => {
        if (status === SELECTABLE_STATUS_PENDING) {
          return;
        }

        callback();
        this.selectableStatus.unsubscribe();
        this.selectableStatus = undefined;
      });
  }

}
