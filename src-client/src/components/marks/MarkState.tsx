// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as _ from 'lodash';
import { openUrl } from '../../lib/common';

// Group state by default
class MarkState {
  [x: string]: any; // tslint:disable-line
  // tslint:disable-next-line
  constructor(service, present, model, rawData) {
    this.markService = service;
    this.present = present;
    this.model = model || [];
    this.rawData = rawData;

    this.actions = {
      filter: { name: 'Filter', canExecute: true, present: (evt, args) => this.filter(evt, args) },
      fetch: { name: 'Fetch', canExecute: true, present: (evt, args) => this.fetch(evt, args) },
      navigateUrl: { name: 'Open URL', canExecute: true, present: (evt, args) => this.navigateUrl(evt, args) }
    };
  }

  // tslint:disable-next-line
  filter(evt, args) {
    if (args === '') {
      this.internalPresent(this.rawData);
    } else {
      let re = new RegExp(args);
      let nextState = this.rawData.filter(t => re.exec(t.url));
      this.internalPresent(nextState);
    }
  }

  // tslint:disable-next-line
  fetch(evt, args) {
    this.markService
      .getMarks()
      .then(results => {

        this.rawData = results;
        this.internalPresent(results);

      }).catch((err) => console.log(err)); // tslint:disable-line
  }

  // tslint:disable-next-line
  internalPresent(data) {
    var nextState =
      _.chain(data)
        .sortBy('domain')
        .groupBy('domain')
        .toPairs()
        .flatMap(i =>
          _.chain(i[1])
            .chunk(2)
            .map((t, tidx) =>
              _.zipObject(['title', 'items', 'isPart'], [i[0], t, tidx > 0])
            ).value()
        ).value();

    this.present(new MarkState(this.markService, this.present, nextState, this.rawData));
  }

  // tslint:disable-next-line
  navigateUrl(evt, args) {
    openUrl(args);
    if (evt) { evt.preventDefault(); }
  }
}

export default MarkState;