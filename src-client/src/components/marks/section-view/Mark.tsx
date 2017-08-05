// Copyright (c) Wael Rabadi. All rights reserved.
// See LICENSE for details.

import * as React from 'react'
import './Mark.css'

import MarkSection from './SectionalView'

interface Props {
    model: Array<any> // tslint:disable-line
    actions: any // tslint:disable-line
}

function Marks({ model, actions }: Props) {
    if (Array.isArray(model) && model.length > 0) {
        return (
            <div className="marks">
                <MarkSection model={model} actions={actions} />
            </div>
        )
    } else {
        return (
            <div className="marks">
                <div className="empty">No marks found!</div>
            </div>
        )
    }
}

export default Marks
export { Props }