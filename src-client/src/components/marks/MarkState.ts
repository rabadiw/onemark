// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import _ from 'lodash'
import { openLink, copyLink } from '../../lib/common'

// Group state by default
class MarkState {
  [x: string]: any // tslint:disable-line
  // tslint:disable-next-line
  constructor(service, present, model, rawData) {
    this.markService = service
    this.present = present
    this.model = model || []
    this.rawData = rawData

    this.actions = {
      filter: { name: 'Filter', canExecute: true, present: (evt, args) => this.filter(evt, args) },
      fetch: { name: 'Fetch', canExecute: true, present: (evt, args) => this.fetch(evt, args) },
      openMark: { name: 'Open Mark', canExecute: true, present: (evt, args) => this.openMark(evt, args) },
      deleteMark: { name: 'Delete Mark', canExecute: true, present: (evt, args) => this.deleteMark(evt, args) },
      copyMark: { name: 'Copy Mark', canExecute: true, present: (evt, args) => this.copyMark(evt, args) }
    }
  }

  // tslint:disable-next-line
  filter(evt, args) {
    if (args === '') {
      this.internalPresent(this.rawData)
    } else {
      let re = new RegExp(args)
      let nextState = this.rawData.filter(t => re.exec(t.url) || re.exec(t.title))
      this.internalPresent(nextState)
    }
  }

  // tslint:disable-next-line
  fetch(evt, args) {
    this.markService
      .getMarks()
      .then(results => {

        this.rawData = results
        this.internalPresent(results)

      }).catch((err) => console.log(err)) // tslint:disable-line
  }

  // tslint:disable-next-line
  internalPresent(data) {
    var nextState =
      _.chain(data)
        .sortBy('domain')
        .groupBy('domain')
        .toPairs()
        .flatMap(i => _
          .chain(i[1])
          .chunk(8)
          .map((t, tidx) =>
            _.zipObject(['title', 'items', 'isPart'], [i[0], t, tidx > 0])
          ).value()
        ).value()

    this.present(new MarkState(this.markService, this.present, nextState, this.rawData))
  }

  // tslint:disable-next-line
  internalPresent2(data: any) {
    var nextState =
      _.chain(data)
        .sortBy('domain')
        .groupBy('domain')
        .toPairs()
        .map(t => _.zipObject(['title', 'items', 'isPart'], [t[0], t[1], false]))
        .value()

    this.present(new MarkState(this.markService, this.present, nextState, this.rawData))
  }

  openMark(evt: Event, args: { url: string, title: string }) {
    openLink(args)
    if (evt) { evt.preventDefault() }
  }

  deleteMark(evt: Event, args: { id: string }) {
    if (args && args.id) {
      this.markService
        .deleteMarks([args])
        .then(() => this.fetch(null, null))
    }
    if (evt) { evt.preventDefault() }
  }

  copyMark(evt: Event, args: { url: string, title: string }) {
    copyLink(args)
    if (evt) { evt.preventDefault() }
  }
}

export default MarkState