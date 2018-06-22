import { html, PolymerElement } from "../../node_modules/@polymer/polymer/polymer-element.js";
/**
 * @customElement
 * @polymer
 */

class OnemarkApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }

  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'onemark-app'
      }
    };
  }

}

window.customElements.define('onemark-app', OnemarkApp);