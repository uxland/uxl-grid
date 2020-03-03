import { html } from "lit-element/lit-element";
import { UxlGrid } from "./uxl-grid";
import { iconTemplate } from "../../icons/icons";
import { repeat } from "lit-html/directives/repeat";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";
import "@uxland/virtualizer";
import "lit-virtualizer/lit-virtualizer";

const renderItem = (item, indexRow) => html`
  <div
    id="row-${indexRow + 1}"
    class="content__row ${classMap({ disabled: item.item.disabled })}"
    part="content__row"
    data-item="${JSON.stringify(item.item)}"
    data-row="${indexRow + 1}"
  >
    ${repeat(
      item.columns,
      (column: any, indexColumn) => html`
        <div
          id="column-${indexColumn + 1}"
          class="content__cell ${item.renderCard ? "card--enabled" : ""}"
          part="content__cell content__cell-${indexColumn + 1}"
          data-item="${JSON.stringify(item.item)}"
          data-column="${indexColumn + 1}"
          data-row="${indexRow + 1}"
        >
          ${(column.renderCell && column.renderCell(item.item)) || item.renderValue(item.item, column.property)}
        </div>
      `
    )}
  </div>
`;

export const template = (props: UxlGrid) => html`${iconTemplate()}
<div id="grid">
	${
    props.showHeader
      ? html`
          <div class="header" part="header">
            ${repeat(
              props.columns,
              (column, index) => html`
                <div
                  id="header-cell-${index + 1}"
                  class="header__cell"
                  data-column-key="${column.displayName}"
                  part="header__cell header__cell-${index + 1}"
                >
                  ${column.displayName || ""}
                  ${column.order == "ASC"
                    ? html`
                        <iron-icon class="order" icon="uxl-grid:arrow-up"></iron-icon>
                      `
                    : html`
                        ${column.order == "DES"
                          ? html`
                              <iron-icon class="order" icon="uxl-grid:arrow-down"></iron-icon>
                            `
                          : nothing}
                      `}
                </div>
              `
            )}
          </div>
        `
      : nothing
  }
	<div class="content" part="content" id="content">
    <lit-virtualizer exportparts="content__row content__cell content__cell-*" .items="${props.virtualizeList}" .renderItem="${renderItem}"></lit-virtualizer>
	</div>
</div>
</div>
`;
