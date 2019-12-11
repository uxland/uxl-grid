import {propertiesObserver} from "@uxland/uxl-utilities";
import {css, customElement, html, LitElement, property, query, unsafeCSS} from "lit-element";
import styles from "./styles.scss";
import {template} from "./template";
import {IColumns} from "../../domain";

// @ts-ignore
@customElement("uxl-grid")
export class UxlGrid extends propertiesObserver(LitElement) {
	
	@property()
	public source: any[] = [];
	
	@property()
	public columns: IColumns[] = [];
	
	@property()
	public isFormatGrid: boolean = false;
	
	@property()
	public showHeader: boolean = true;
	
	@property()
	public numberColumns: number;
	
	@property()
	private selectedColumn: IColumns;
	
	gridWidth = () => {
		const doc = this.shadowRoot.querySelector('#grid');
		if (doc) {
			doc.style.setProperty('--grid-width', `${doc.offsetWidth}px`)
			//console.log(doc.offsetWidth);
		}
	}
	
	constructor() {
		super();
		window.addEventListener('resize', this.gridWidth)
		this.gridWidth()
	}
	
	firstUpdated(e) {
		super.firstUpdated(e);
		this.gridWidth();
	}
	
	static get styles() {
		return css`
      ${unsafeCSS(styles)}
    `;
	}
	
	public render() {
		return html`
      ${template(this)}
    `;
	}

}


