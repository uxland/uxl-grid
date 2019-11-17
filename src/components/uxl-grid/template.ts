import { html } from "lit-element/lit-element";
import { repeat } from "lit-html/directives/repeat";
import { UxlGrid} from "./uxl-grid";
import {iconTemplate} from "../../icons/icons";
import { nothing } from 'lit-html';
import { classMap } from "lit-html/directives/class-map";
import "../format-table/format-table";
import "../format-grid/format-grid";


export const template = (props: UxlGrid) => html`
  ${iconTemplate()}
  ${props.isFormatGrid ? html`<format-grid .source="${props.source}" .orderedList="${props.orderedList}" .columns="${props.columns}"></format-grid>` :
		html `
		<format-table .source="${props.source}" .orderedList="${props.orderedList}" .columns="${props.columns}"></format-table>
		`}
`;
