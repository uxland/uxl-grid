import {listen, propertiesObserver} from "@uxland/uxl-utilities";
import {css, customElement, html, LitElement, property, query, unsafeCSS} from "lit-element";
import styles from "./styles.scss";
import {template} from "./template";
import {IColumns} from "../../domain";
import * as R from "ramda";

// @ts-ignore
@customElement("uxl-grid")
export class UxlGrid extends propertiesObserver(LitElement) {

	constructor() {
		super();
		window.addEventListener('resize', this.gridWidth)
		this.gridWidth()
	}

	firstUpdated(e) {
		this.orderedList = this.source;
		super.firstUpdated(e);
		this.gridWidth();
	}

	@property()
	public source: any[] = [];

	@property()
	public orderedList: any[] = [];

	@property()
	public columns: IColumns[] = [];

	@property()
	public showHeader: boolean = true;

	@property()
	private selectedColumn: IColumns;

	@listen("click", ".header__cell")
	public onClickHeaderCell(event) {
		let htmlElement: HTMLElement = event.currentTarget;
		if (htmlElement) this.selectedColumn = JSON.parse(htmlElement.dataset['column']);
		this.orderedList = this.sortColumn();
	}

	@listen("click", ".content__cell")
	public onClickTableRowCell(event) {
		let htmlElement: HTMLElement = event.currentTarget;
		let item = JSON.parse(htmlElement.dataset['item']);
		if (item) {
			const onTableRowCellSelected = new CustomEvent("uxl-grid-row-cell-selected", {
				composed: true,
				detail: {item}
			});
			this.dispatchEvent(onTableRowCellSelected);
		}
	}

	toggleOrderField() {
		let selectedColumnClone = R.clone(this.selectedColumn);
		if (!selectedColumnClone.order || selectedColumnClone.order == "ASC") {
			selectedColumnClone.order = "DES";
		} else {
			selectedColumnClone.order = "ASC";
		}
		return selectedColumnClone;
	}

	changeColumnOrder() {
		if (this.selectedColumn) {
			this.selectedColumn = this.toggleOrderField();
			this.columns.forEach((c) => c.order = undefined);
			const index = this.columns.findIndex((col) => col.property == this.selectedColumn.property);
			if (index > -1) {
				return R.pipe(
					R.remove(index, 1),
					R.insert(index, <any>this.selectedColumn)
				)(this.columns)
			}
		}
		return this.columns
	}

	sortColumn() {
		this.columns = this.changeColumnOrder();
		if (!this.selectedColumn.order || this.selectedColumn.order == "ASC") {
			return R.sort(R.ascend(R.prop(this.selectedColumn.property)))(this.orderedList);
		}
		return R.sort(R.descend(R.prop(this.selectedColumn.property)))(this.orderedList);
	}

	sourceChanged() {
		this.orderedList = this.source;
		if (this.selectedColumn) {
			this.orderedList = this.sortColumn();
		}
	}
	
	gridWidth = () => {
		const doc = this.shadowRoot.querySelector('#grid');
		if (doc) {
			doc.style.setProperty('--grid-width', `${doc.offsetWidth}px`);
			//console.log(doc.offsetWidth);
			doc.style.setProperty('--number-columns', `${this.columns.length + 1}`);
		}
	}

	render() {
		return html`${template(this)}`;
	}

	static get styles() {
		return css`${unsafeCSS(styles)}`;
	}

}


