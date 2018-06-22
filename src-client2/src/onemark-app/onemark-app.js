import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-icon';
import './onemark-icons.js';
import './marks-view-default.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

/**
 * @customElement
 * @polymer
 */
class OnemarkApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: #000;

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }

      </style>

      <app-drawer-layout fullbleed="" narrow="{{narrow}}">

        <!-- Main content -->
        <app-header-layout has-scrolling-region="">

          <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>
              <!--<paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>-->
              <div main-title="">[[appTitle]]</div>
              <paper-icon-button icon="onemark-icons:delete"></paper-icon-button>
              <paper-icon-button icon="onemark-icons:search"></paper-icon-button>
              <paper-icon-button icon="onemark-icons:close"></paper-icon-button>
              <paper-input label="search">
              <i class="material-icons">search</i>
                <iron-icon icon="mail" slot="prefix"></iron-icon>
              </paper-input>
            </app-toolbar>
          </app-header>

          <iron-pages selected="view1" attr-for-selected="name" role="main">
            <marks-view-default name="view1"></marks-view-default>
            <my-view404 name="view404"></my-view404>
          </iron-pages>
        </app-header-layout>

      </app-drawer-layout>
    `;
  }
  static get properties() {
    return {
      appTitle: {
        type: String,
        value: 'Onemark'
      }
    };
  }
}

window.customElements.define('onemark-app', OnemarkApp);
