import { listen } from "@uxland/uxl-utilities";
import {
  css,
  customElement,
  html,
  LitElement,
  property,
  unsafeCSS
} from "lit-element";
import { IColumns } from "../../src";
import styles from "./styles.scss";
import { template } from "./template";
interface Item {
  id: number;
  edad: number;
}
@customElement("uxl-grid-demo")
export class UxlGridDemo extends LitElement {
  get source() {
    let items: Item[] = [];
    for (let i = 0; i < this.length; i++) {
      items.push({
        id: i,
        edad: Math.floor(Math.random() * 80) + 18,
        name: "Nombre",
        surname: "apellido"
      });
    }
    return items;
  }

  length = 100;

  @property()
  public columns: IColumns[] = [
    {
      property: "id",
      displayName: "ID",
      disableSorting: true
    },
    {
      property: "edad",
      displayName: "Edad de la persona"
    },
    {
      property: "name",
      displayName: "Nombre"
    },
    {
      property: "surname",
      displayName: "Apellido"
    }
  ];

  @property()
  public showHeader: boolean = false;

  @property()
  public numberColumns: number;

  @listen("uxl-grid-row-cell-selected", "uxl-grid")
  rowSelected(e) {
    console.log("row cell");
  }

  @listen("uxl-grid-content-cell-selected", "uxl-grid")
  contentCellSelected(e) {
    console.log("content cell");
  }

  static get styles() {
    return css`
      ${unsafeCSS(styles)}
    `;
  }

  render() {
    return html`
      ${template(this)}
    `;
  }
}
