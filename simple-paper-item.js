import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';
import '@polymer/paper-item/paper-item-shared-styles.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';

/*
    A <paper-item> that avoids problems with <paper-input> children.  See
href="https://github.com/PolymerElements/paper-item/issues/103  for details.

    */

Polymer({
    _template: html`
    <style include="paper-item-shared-styles">
      :host {
        @apply --layout-horizontal;
        @apply --layout-center;
        @apply --paper-font-subhead;
        @apply --paper-item;
      }
    </style>
    <slot></slot>
    `,
    is: 'simple-paper-item',
    behavior: [
        Polymer.IronControlState,
        Polymer.PaperItemBehaviorImpl
    ]
});
