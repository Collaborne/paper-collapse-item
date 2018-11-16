import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-collapse/iron-collapse.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-item/paper-item-body.js';
import '@polymer/paper-styles/paper-styles.js';
import './simple-paper-item.js';

/**
 * `PaperCollapseItem`
 *
 * A Material Design [item with header and collapsible content](https://www.google.com/design/spec/components/lists.html)
 *
 * ### Example
 *
 * ```html
 * <paper-collapse-item icon="icons:favorite" header="Item 1" opened>
 *  Lots of very interesting content.
 * </paper-collapse-item>
 * <paper-collapse-item icon="icons:info" header="Item 2">
 *   Lots of very interesting content.
 * </paper-collapse-item>
 * <paper-collapse-item icon="icons:help" header="Item 3">
 *   Lots of very interesting content.
 * </paper-collapse-item>
 * ```
 * ### Styling
 *
 * The following custom properties and mixins are available for styling:
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * --paper-collapse-item-header|Mixin applied to header of collapsible item|{}
 * --paper-collapse-item-content|Mixin applied to collapsible content|{}
 * --paper-collapse-item-icon|Mixin applied to icon|{}
 * --paper-collapse-simple-paper-item-styles|Mixin applied to simple-paper-item|{}
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PaperCollapseItem extends PolymerElement {
	static get template() {
		return html`
			<style>
				.header {
					min-height: 48px;
					color: var(--primary-text-color);
					@apply --layout-horizontal;
					@apply --layout-center;
					@apply --paper-font-subhead;
					@apply --paper-collapse-item-header;
				}
				.icon {
					margin-right: 24px;
					--iron-icon-height: 32px;
					--iron-icon-width: 32px;
					@apply --paper-collapse-item-icon;
				}
				.icon, .toogle {
					color: var(--disabled-text-color);
				}
				.html {
					@apply --layout-flex;
				}
				.content {
					color: var(--primary-text-color);
					@apply --paper-font-body1;
					@apply --paper-collapse-item-content;
				}

				simple-paper-item {
					@apply --paper-collapse-simple-paper-item-styles;
				}
			</style>

			<simple-paper-item>
				<paper-item-body>
					<div class="header" on-tap="_toggleOpened">
						<template is="dom-if" if="[[_or(icon, src)]]">
							<iron-icon class="icon" src="[[src]]" icon="[[icon]]"></iron-icon>
						</template>
						<template is="dom-if" if="[[header]]">
							<div class="html" inner-h-t-m-l="[[header]]"></div>
						</template>
						<slot class="html" name="header"></slot>
						<paper-icon-button class="toggle" icon="[[_toggleIcon]]"></paper-icon-button>
					</div>
					<iron-collapse class="content" opened="{{opened}}">
						<slot></slot>
					</iron-collapse>
				</paper-item-body>
			</simple-paper-item>
			`;
	}

	static get properties() {
		return {
			/**
			 * Text in the header row
			 */
			header: String,

			/**
			 * The name of the icon to use. The name should be of the
			 * form: iconset_name:icon_name.
			 */
			icon: String,

			/**
			 * If using paper-collapse-item without an iconset, you can set the
			 * src to be the URL of an individual icon image file. Note that
			 * this will take precedence over a given icon attribute.
			 */
			src: String,

			/**
			 * True if the content section is opened
			 */
			opened: {
				type: Boolean,
				reflectToAttribute: true,
				notify: true
			},

			_toggleIcon: {
				type: String,
				computed: '_computeToggleIcon(opened)'
			}
		};
	}

	/**
	 * Fired whenever the status is changed (opened/closed)
	 *
	 * @event toggle
	 */
	_toggleOpened(e) {
		this.opened = !this.opened;

		const toggleEvent = new CustomEvent('toggle', {
			detail: this,
			bubbles: true,
			composed: true,
		});

		this.dispatchEvent(toggleEvent);
	}

	_computeToggleIcon(opened) {
		return opened ? 'icons:expand-less' : 'icons:expand-more';
	}

	_or(value1, value2) {
		return value1 || value2;
	}
}

window.customElements.define('paper-collapse-item', PaperCollapseItem);
