import {html} from 'lit-element/lit-element';
import { FormatTable } from "./format-table";
import {repeat} from "lit-html/directives/repeat";
import {nothing} from "lit-html";
import {classMap} from "lit-html/directives/class-map";

export const template = (props: FormatTable) => html`
  <table class="table" part="table">
    ${props.showHeader ? html `
            <tr class="table__header" part="table__header">
    
      ${repeat(
    props.columns,
    (column, index) => html`
          <td id="header-${index + 1}" class="table__header-cell" data-column="${JSON.stringify(column)}" part="table__header-cell-${index + 1}">
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
          </td>
        `
)}
    </tr>
    ` : nothing}
    ${repeat(
		props.orderedList,
		(item, index) => html`
        <tr id="row-${index + 1}" class="table__row ${classMap({disabled: item.disabled})}" part="table__row">
          ${repeat(
				props.columns,
				(column, index) => html`
              <td id="column-${index + 1}" class="table__row-cell" part="table__row-cell-${index + 1}" data-item="${JSON.stringify(item)}">${item[column.property] || ""}</td>
            `
		)}
        </tr>
      `
)}
  </table>
`;
