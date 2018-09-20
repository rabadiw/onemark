import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class MarksGrid extends PolymerElement {

    static get template() {
        return html`<div>current state: 
            [[state]]
        </div>
        
        <div><b>All Marks</b></div><br />
        <template is="dom-repeat" id="marksList" items="{{marks}}">
            <div>Given name: <span>{{item.id}}</span></div>
            <div>Family name: <span>{{item.title}}</span></div>
            <button on-click="toggleSelection">Select/deselect</button>
            <br /><br />
        </template>
        <array-selector id="selector" items="{{marks}}" selected="{{selected}}" multi toggle></array-selector>
        <div><b>Selected marks</b></div><br />
        <template is="dom-repeat" items="{{selected}}">
            <div>Given name: <span>{{item.id}}</span></div>
            <div>Family name: <span>{{item.title}}</span></div>
            <br />
        </template>
        
        `;
    }

    static get properties() {
        return {
            state: {
                type: String,
                value: ''
            },
            marks: {
                type: Array,
                initialCount: 2,
                value() {
                    return [
                        { id: 1, title: 'Site 1' },
                        { id: 2, title: 'Site 2' },
                        { id: 3, title: 'Site 3' },
                        { id: 4, title: 'Site 4' }
                    ]
                }
            }
        };
    }

    ready() {
        super.ready();
        this.state = 'ready';
    }

    toggleSelection(e) {
        var item = this.$.marksList.itemForElement(e.target);
        this.$.selector.select(item);
      }

}

window.customElements.define('marks-grid', MarksGrid);