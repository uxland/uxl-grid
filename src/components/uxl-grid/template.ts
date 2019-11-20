import { html } from "lit-element/lit-element";
import { UxlGrid} from "./uxl-grid";
import {iconTemplate} from "../../icons/icons";
import "../format-table/format-table";
import "../format-grid/format-grid";


export const template = (props: UxlGrid) => html`
  ${iconTemplate()}
  ${props.isFormatGrid ?
        html`
            <format-grid .source="${props.source}" .columns="${props.columns}" part="format-grid" .showHeader="${props.showHeader}"
            exportparts="header, header__cell-1, header__cell-2, header__cell-3, header__cell-4, header__cell-5, header__cell-6, header__cell-7, content, content__row, content__cell, content__cell-1, content__cell-2, content__cell-3, content__cell-4, content__cell-5, content__cell-6, content__cell-7"></format-grid>` :
		html `
		    <format-table .source="${props.source}" .columns="${props.columns}" .showHeader="${props.showHeader}"></format-table>
		`}
`;
