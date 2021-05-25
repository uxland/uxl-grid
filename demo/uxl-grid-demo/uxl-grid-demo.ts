import {listen} from '@uxland/uxl-utilities';
import {css, customElement, html, LitElement, property, unsafeCSS} from 'lit-element';
import {IColumns} from '../../src';
import styles from './styles.scss';
import {template} from './template';

interface Item {
	id: number;
	edad: number;
}

@customElement('uxl-grid-demo')
export class UxlGridDemo extends (LitElement) {
	
	length = 10000;
	@property()
	public columns: IColumns[] = [
		{
			property: "id",
			displayName: "ID"
		},
		{
			property: "edad",
			displayName: "Edad de la persona",
			disabled: true
		},
		{
			property: "name",
			displayName: "Nombre"
		},
		{
			property: "surname",
			displayName: "Apellido"
		}
	];
	@property()
	public showHeader: boolean = false;
	@property()
	public numberColumns: number;
	
	static get styles() {
		return css`${unsafeCSS(styles)}`;
	}
	
	get source() {
		
		let items: Item[] = [];
		for (let i = 0; i < this.length; i++) {
			items.push({id: i, edad: Math.floor(Math.random() * 80) + 18, name: "Nombre", surname: "apellido"})
		}
		;
		return items;
		
	}
	
	@listen("uxl-grid-row-cell-selected", "uxl-grid")
	rowSelected(e) {
		console.log("row cell");
	}
	
	@listen("uxl-grid-content-cell-selected", "uxl-grid")
	contentCellSelected(e) {
		console.log("content cell")
	}
	
	render() {
		return html`${template(this)}`;
	}
}
