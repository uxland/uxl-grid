import { html } from "lit-element/lit-element";
import { UxlGrid} from "./uxl-grid";
import {iconTemplate} from "../../icons/icons";
import "../format-table/format-table";
import "../format-grid/format-grid";


export const template = (props: UxlGrid) => html`
  ${iconTemplate()}
  ${props.isFormatGrid ?
        html`
            <format-grid .source="${props.source}" .columns="${props.columns}" part="format-grid"
            exportparts="header, header__cell, content, content__row, content__cell, content__cell-1, content__cell-2, content__cell-3, content__cell-4, content__cell-5, content__cell-6"></format-grid>` :
		html `
		    <format-table .source="${props.source}" .columns="${props.columns}"></format-table>
		`}
`;
