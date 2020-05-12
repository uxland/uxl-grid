import { html } from "lit-element/lit-element";
import { UxlGrid } from "./uxl-grid";
import { iconTemplate } from "../../icons/icons";
import { repeat } from "lit-html/directives/repeat";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";

export const template = (props: UxlGrid) => html`${iconTemplate()}
<custom-style><style>${props.extraStyles}</style></custom-style>
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
		${repeat(
      props.orderedList,
      (item, indexRow) => html`
        <div
          id="row-${indexRow + 1}"
          class="content__row ${classMap({ disabled: item.disabled })}"
          part="content__row"
          data-item="${JSON.stringify(item)}"
          data-row="${indexRow + 1}"
        >
          ${props.renderCard ? html`
            <div class="card" part="card">${props.renderCard(item)}</div>
          `: nothing}
          ${repeat(
            props.columns,
            (column, indexColumn) => html`
                <div
                  id="column-${indexColumn + 1}"
                  class="content__cell ${props.renderCard ? 'card--enabled' :''}"
                  part="content__cell content__cell-${indexColumn + 1}"
                  data-item="${JSON.stringify(item)}"
                  data-column="${indexColumn + 1}"
                  data-row="${indexRow + 1}"
                >
                  ${(column.renderCell && column.renderCell(item)) || props.renderValue(item, column.property)}
                </div>
              `
            )
          }
        </div>
      `
    )}
	</div>
</div>
</div>
`;
