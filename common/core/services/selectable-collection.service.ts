import * as _ from 'lodash';
import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import {
  SELECTABLE_STATUS_PENDING,
  SELECTABLE_STATUS_READY,
} from '../types';


@Injectable()
export class SelectableCollectionService {

  collection: any;
  selectableCollectionChanged$: any;
  status: BehaviorSubject<any>;
  private readonly selectableCollectionChanged: Subject<any>;


  constructor() {
    this.collection = [];
    this.selectableCollectionChanged = new Subject<any>();
    this.selectableCollectionChanged$ = this.selectableCollectionChanged.asObservable();
    this.status = new BehaviorSubject(SELECTABLE_STATUS_READY);
  }


  addItem(item: any) {
    this.status.next(SELECTABLE_STATUS_PENDING);
    const alreadyExist = _.find(this.collection, (expectedItem: any) => {
      return expectedItem.id === item.id;
    });

    if (alreadyExist) {
      this.status.next(SELECTABLE_STATUS_READY);

      return;
    }

    this.collection.push(item);
    this.status.next(SELECTABLE_STATUS_READY);
    this.selectableCollectionChanged.next(this.collection);
  }


  removeItem(item: any) {
    this.status.next(SELECTABLE_STATUS_PENDING);

    const index = _.findIndex(this.collection, (expectedItem: any) => {
      return expectedItem.id === item.id;
    });

    if (index === -1) {
      this.status.next(SELECTABLE_STATUS_READY);

      return;
    }

    this.collection.splice(index, 1);
    this.status.next(SELECTABLE_STATUS_READY);
    this.selectableCollectionChanged.next(this.collection);
  }


  addItems(items: Array<any>) {
    this.status.next(SELECTABLE_STATUS_PENDING);
    this.collection = [...items];

    this.status.next(SELECTABLE_STATUS_READY);
    this.selectableCollectionChanged.next(this.collection);
  }


  removeItems() {
    this.status.next(SELECTABLE_STATUS_PENDING);
    this.collection = [];

    this.status.next(SELECTABLE_STATUS_READY);
    this.selectableCollectionChanged.next(this.collection);
  }


  getItemById(id: string): any {
    const result = _.find(this.collection, (item: any) => {
      return item.id === id;
    });

    return result;
  }


  getAllItemsId() {
    const result = [];
    _.forEach(this.collection, (item) => {
      result.push(item.id);
    });

    return result;
  }


  reset() {
    this.collection = [];
  }

}
