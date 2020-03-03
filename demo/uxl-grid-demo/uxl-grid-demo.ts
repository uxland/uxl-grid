import {html, LitElement, property, customElement, query, css, unsafeCSS} from 'lit-element';
import {template} from './template';
import styles from './styles.scss';
import { IColumns } from '../../src';
import { id } from '@uxland/uxl-utilities';
interface Item {
	id: number;
	edad: number;
}
@customElement('uxl-grid-demo')
export class UxlGridDemo extends (LitElement) {
	
	get source(){

			let items: Item[] = [];
			for(let i= 0; i< this.length; i++){
				items.push({id: i, edad: Math.floor(Math.random() * 80) + 18 })
			};
			return items;
		
	}

	length = 100;
	
	@property()
	public columns :IColumns[] = [
		{
			property: "id",
			displayName: "ID"
		},
    {
      property: "edad",
      displayName: "Edad de la persona"
    }
  ];
	
	@property()
	public showHeader: boolean = false;
	
	@property()
	public numberColumns: number;
	
	static get styles() {
		return css`${unsafeCSS(styles)}`;
	}
	
	render() {
		return html`${template(this)}`;
	}
}
