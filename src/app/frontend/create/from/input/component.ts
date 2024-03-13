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

import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ICanDeactivate} from '@common/interfaces/candeactivate';
import {NAMESPACE_STATE_PARAM} from '@common/params/params';

import {CreateService} from '@common/services/create/service';
import {HistoryService} from '@common/services/global/history';
import {NamespaceService} from '@common/services/global/namespace';

@Component({
  selector: 'kd-create-from-input',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
})
export class CreateFromInputComponent extends ICanDeactivate {
  inputData = '';
  private created_ = false;

  constructor(
    private readonly namespace_: NamespaceService,
    private readonly create_: CreateService,
    private readonly history_: HistoryService,
    private readonly router_: Router
  ) {
    super();
  }

  isCreateDisabled(): boolean {
    return !this.inputData || this.inputData.length === 0;
  }

  create(): void {
    this.create_.createContent(this.inputData).then(() => {
      this.created_ = true;
      this.router_.navigate(['overview'], {
        queryParams: {[NAMESPACE_STATE_PARAM]: this.namespace_.current()},
      });
    });
  }

  cancel(): void {
    this.history_.goToPreviousState('overview');
  }

  areMultipleNamespacesSelected(): boolean {
    return this.namespace_.areMultipleNamespacesSelected();
  }

  canDeactivate(): boolean {
    return this.isCreateDisabled() || this.created_;
  }
}
