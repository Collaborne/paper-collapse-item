import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import {FlattenedNodesObserver} from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';

/**
 * `PaperCollapseGroup`
 * 
 * An element which is able to group a set of paper-collapse-items , where only one
 * item can be opened.
 * 
 * ### Example
 * 
 * ```html
 * <paper-collapse-group>
 * <paper-collapse-item icon="icons:favorite" header="Item 1" opened>
 * 	Only on item will be opened inside groups
 * </paper-collapse-item>
 * <paper-collapse-item icon="icons:info" header="Item 2">
 *		Only on item will be opened inside groups
 * </paper-collapse-item>
 * <paper-collapse-item icon="icons:help" header="<b>Header <u>with</u> HTML</b>">
 *	Only on item will be opened inside groups
 * </paper-collapse-item>
 * </paper-collapse-group>
 * ```
 * 
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PaperCollapseGroup extends PolymerElement {

  static get template() {
    return html`<slot id="content"></slot>`;
  }

  static get properties() {
    return {
      /**
       * Array of observed paper-collapse-items
       *
       * @type {Array}
       */
      _items: {
        type: Array,
        notify: true,
        value: []
      }
    };
  }

  /**
   * Use for one-time configuration of your component after local DOM is
   * initialized.
   */
  ready() {
    super.ready();
    this.addEventListener('toggle', e => this._onToggle(e));
  }

  connectedCallback() {
    super.connectedCallback();
    this._observer = new FlattenedNodesObserver(this.$.content, info => {

      var addedItems = info.addedNodes.filter(node => {
        return node.nodeName.toLowerCase() === 'paper-collapse-item';
      });

      if (addedItems.length > 0) {
        this._items = this._items.concat(addedItems);

        const updateEvent = new CustomEvent('update', {
          detail: null,
          bubbles: true,
          composed: true
        });

        this.dispatchEvent(updateEvent);
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
  }

  /**
   * On Toggle
   *
   * Listen to fired toggle events from items and update the groups
   *
   * @param  {Event} e
   */
  _onToggle(e) {
    this._items.forEach(item => {
      // Force all other items (aside the one triggering the event) to
      // get closed
      if (item !== e.target) {
        item.opened = false;
      }
    });
  }
}

window.customElements.define('paper-collapse-group', PaperCollapseGroup);
