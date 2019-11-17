import { listen, propertiesObserver } from "@uxland/uxl-utilities";
import { css, customElement, html, LitElement, property, query, unsafeCSS } from "lit-element";
import styles from "./styles.scss";
import { template } from "./template";
import * as R from "ramda";
import {IColumns} from "../../domain";

// @ts-ignore
@customElement("uxl-grid")
export class UxlGrid extends propertiesObserver(LitElement) {

	@property()
	public source: any[] = [];
	
	@property()
	public orderedList: any[] = [];
	
	@property()
	public columns: IColumns[] = [];
	
	@property()
	private selectedColumn: IColumns;
	
	@property()
	public isFormatGrid: boolean = false;
	

  public render() {
    return html`
      ${template(this)}
    `;
  }

  static get styles() {
    return css`
      ${unsafeCSS(styles)}
    `;
  }
}
