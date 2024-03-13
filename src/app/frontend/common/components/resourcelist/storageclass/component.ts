// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {HttpParams} from '@angular/common/http';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {StorageClass, StorageClassList} from '@api/root.api';
import {Observable} from 'rxjs';

import {ResourceListBase} from '@common/resources/list';
import {NotificationsService} from '@common/services/global/notifications';
import {EndpointManager, Resource} from '@common/services/resource/endpoint';
import {ResourceService} from '@common/services/resource/resource';
import {MenuComponent} from '../../list/column/menu/component';
import {ListGroupIdentifier, ListIdentifier} from '../groupids';

@Component({
  selector: 'kd-storage-class-list',
  templateUrl: './template.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorageClassListComponent extends ResourceListBase<StorageClassList, StorageClass> {
  @Input() endpoint = EndpointManager.resource(Resource.storageClass).list();

  constructor(
    private readonly sc_: ResourceService<StorageClassList>,
    notifications: NotificationsService,
    cdr: ChangeDetectorRef
  ) {
    super('storageclass', notifications, cdr);
    this.id = ListIdentifier.storageClass;
    this.groupId = ListGroupIdentifier.cluster;

    // Register action columns.
    this.registerActionColumn<MenuComponent>('menu', MenuComponent);
  }

  getResourceObservable(params?: HttpParams): Observable<StorageClassList> {
    return this.sc_.get(this.endpoint, undefined, params);
  }

  map(storageClassList: StorageClassList): StorageClass[] {
    return storageClassList.items;
  }

  getDisplayColumns(): string[] {
    return ['name', 'provisioner', 'params', 'created'];
  }
}
