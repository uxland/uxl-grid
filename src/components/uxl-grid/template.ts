import { html } from "lit-element/lit-element";
import { UxlGrid} from "./uxl-grid";
import {iconTemplate} from "../../icons/icons";
import "../format-table/format-table";
import "../format-grid/format-grid";


export const template = (props: UxlGrid) => html`
  ${iconTemplate()}
  ${props.isFormatGrid ? 
        html`
            <format-grid .source="${props.source}" .columns="${props.columns}"></format-grid>` :
		html `
		    <format-table .source="${props.source}" .columns="${props.columns}"></format-table>
		`}
`;
