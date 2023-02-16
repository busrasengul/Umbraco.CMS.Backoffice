import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import '../../../components/input-checkbox-list/input-checkbox-list.element';
import type { UmbInputCheckboxListElement } from '../../../components/input-checkbox-list/input-checkbox-list.element';
import { UmbLitElement } from '@umbraco-cms/element';
import type { DataTypePropertyModel } from '@umbraco-cms/backend-api';

/**
 * @element umb-property-editor-ui-checkbox-list
 */
@customElement('umb-property-editor-ui-checkbox-list')
export class UmbPropertyEditorUICheckboxListElement extends UmbLitElement {
	static styles = [UUITextStyles];

	private _value: Array<string> = [];
	@property({ type: Array })
	public get value(): Array<string> {
		return this._value;
	}
	public set value(value: Array<string>) {
		this._value = value || [];
	}

	@property({ type: Array, attribute: false })
	public set config(config: Array<DataTypePropertyModel>) {
		const listData = config.find((x) => x.alias === 'items');

		if (!listData) return;

		// formatting the items in the dictionary into an array
		const sortedItems = [];
		const values = Object.values<{ value: string; sortOrder: number }>(listData.value);
		const keys = Object.keys(listData.value);
		for (let i = 0; i < values.length; i++) {
			sortedItems.push({ key: keys[i], sortOrder: values[i].sortOrder, value: values[i].value });
		}
		// ensure the items are sorted by the provided sort order
		sortedItems.sort((a, b) => {
			return a.sortOrder > b.sortOrder ? 1 : b.sortOrder > a.sortOrder ? -1 : 0;
		});

		console.log('sortedItems', sortedItems, 'value', this._value);

		this._list = sortedItems.map((x) => ({ key: x.key, checked: this._value.includes(x.value), value: x.value }));
	}

	@state()
	private _list: Array<{ key: string; checked: boolean; value: string }> = [];

	private _onChange(event: CustomEvent) {
		this.value = (event.target as UmbInputCheckboxListElement).selected;
		this.dispatchEvent(new CustomEvent('property-value-change'));
	}

	render() {
		console.log('list', this._list);
		return html`<umb-input-checkbox-list
			@change="${this._onChange}"
			.selectedKeys="${this._value}"
			.list="${this._list}"></umb-input-checkbox-list>`;
	}
}

export default UmbPropertyEditorUICheckboxListElement;

declare global {
	interface HTMLElementTagNameMap {
		'umb-property-editor-ui-checkbox-list': UmbPropertyEditorUICheckboxListElement;
	}
}
