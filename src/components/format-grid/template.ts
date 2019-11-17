import {html} from 'lit-element/lit-element';
import { FormatGrid } from "./format-grid";
import {repeat} from "lit-html/directives/repeat";
import {nothing} from "lit-html";
import {classMap} from "lit-html/directives/class-map";

export const template = (props: FormatGrid) => html`
<div class="header" part="header">
	${repeat(
		props.columns,
		(column, index) => html`
			<div id="header-cell-${index + 1}" class="header__cell" data-column="${JSON.stringify(column)}" part="header__cell-${index + 1}">
            ${column.displayName || ""}
            ${column.order == "ASC"
				? html`
                  <iron-icon icon="uxl-grid:arrow-up"></iron-icon>
                `
				: html`
                  ${column.order == "DES"
						? html`
                        <iron-icon icon="uxl-grid:arrow-down"></iron-icon>
                      `
						: nothing}
                `}
			</div>
`)}
	</div>
	<div class="content">
	    ${repeat(
		props.orderedList,
		(item, index) => html`
        <div id="row-${index + 1}" class="content__row ${classMap({disabled: item.disabled})}" part="content__row">
          ${repeat(
				props.columns,
				(column, index) => html`
              <div id="column-${index + 1}" class="content__cell" part="content__cell-${index + 1}" data-item="${JSON.stringify(item)}">${item[column.property] || ""}</div>
            `
		)}
        </div>
      `
)}
	</div>
</div>

`;
