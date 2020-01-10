import {html, LitElement, property, customElement, query, css, unsafeCSS} from 'lit-element';
import {template} from './template';
import styles from './styles.scss';
import { IColumns } from '../../src';
import { id } from '@uxland/uxl-utilities';

interface Item {
    id;
    nombre;
    apellido;
    edad;

}
@customElement('uxl-grid-demo')
export class UxlGridDemo extends (LitElement) {
	
	@property()
	public source = [
		{
			id: 1,
			nombre: "Antonio",
			apellidos: "Garcia Martinez",
			edad: 35,
			sexo: "hombre"
		},
		{
			id: 1,
			nombre: "Maria",
			apellidos: "Garcia Martinez",
			edad: 35,
			sexo: "mujer"
		},
		{
			id: 1,
			nombre: "Francisco Jose",
			apellidos: "Lopez Sanchez",
			edad: 23,
			sexo: "hombre"
		},
		{
			id: 1,
			nombre: "Maria Dolores",
			apellidos: "Lopez Sanchez",
			edad: 23,
			sexo: "mujer"
		},
		{
			id: 1,
			nombre: "Jose Antonio",
			apellidos: "Gonzalez Gomez",
			edad: 44,
			sexo: "hombre",
			disabled: true
		}
		
		,
		{
			id: 1,
			nombre:"Maria Dolores",
			apellidos:"Gonzalez Gomez",
			edad:44,
			sexo: "mujer"
		}
		,
		{
			id: 1,
			nombre: "Francisco Javier",
			apellidos: "Jimenez Moreno",
			edad: 54,
			sexo: "hombre"
		}
	]
	;
	
	@property()
	public columns :IColumns[] = [
    {
      property: "edad",
      displayName: "Edad de la persona"
    },
    {
      property: "nombre",
      displayName: "Nombre de la persona"
    },
    {
      property: "apellido",
      displayName: "Apellido de la persona"
    },
    {
		displayName: "Nombre formateado",
		property:"nombre",
		renderCell:(item:Item) => html `N:${item.nombre} P:${item.apellido}`
    },
	{
		property: "apellido",
		displayName: "Apellido de la persona"
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
