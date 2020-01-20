import { html } from "lit-element/lit-element";
import { UxlGrid } from "./uxl-grid";
import { iconTemplate } from "../../icons/icons";
import { repeat } from "lit-html/directives/repeat";
import { nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map";

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
		${repeat(
      props.orderedList,
      (item, index) => html`
        <div
          id="row-${index + 1}"
          class="content__row ${classMap({ disabled: item.disabled })}"
          part="content__row"
          data-item="${JSON.stringify(item)}"
        >
          ${props.renderCard ? html`
            <div class="card">${props.renderCard(item)}</div>
          `: html`0`}
          ${repeat(
            props.columns,
            (column, index) => html`
                <div
                  id="column-${index + 1}"
                  class="content__cell ${props.renderCard ? 'card--enabled' :''}"
                  part="content__cell content__cell-${index + 1}"
                  data-item="${JSON.stringify(item)}"
                >
                  ${(column.renderCell && column.renderCell(item)) || item[column.property] || ""}
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
