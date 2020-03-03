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
	public virtualizeList: any[] = [];

	@property()
	public columns: IColumns[] = [];

	@property()
	public showHeader: boolean = true;

	@property()
	public renderCard: (any)=>any;

	@property()
	private selectedColumn: IColumns;

	private findColumnIndex(displayName) {
		return this.columns.findIndex((col) => col.displayName == (displayName || ""))
	}
	private findColumn(displayName): IColumns {
		return this.columns[this.findColumnIndex(displayName)];
	}
	@listen("click", ".header__cell")
	public onClickHeaderCell(event) {
		let htmlElement: HTMLElement = event.currentTarget;
		let displayName = htmlElement.dataset['columnKey'];
		this.selectedColumn = this.findColumn(displayName);
		this.columns = this.changeColumnOrder();
		this.orderedList = this.sortColumn();
	}

	@listen("click", ".content__row")
	public onClickTableRowCell(event) {
		let htmlElement: HTMLElement = event.currentTarget;
		let item = JSON.parse(htmlElement.dataset['item']);
		let row = Number.parseInt(htmlElement.dataset['row']);
		if (item) {
			const onTableRowCellSelected = new CustomEvent("uxl-grid-row-cell-selected", {
				composed: true,
				detail: {item, row}
			});
			this.dispatchEvent(onTableRowCellSelected);
		}
	}

	@listen("click", ".content__cell")
	public onClickTableCell(event) {
		let htmlElement: HTMLElement = event.currentTarget;
		let item = JSON.parse(htmlElement.dataset['item']);
		let column = Number.parseInt(htmlElement.dataset['column']);
		let row = Number.parseInt(htmlElement.dataset['row']);
		if (item) {
			const onTableRowCellSelected = new CustomEvent("uxl-grid-content-cell-selected", {
				composed: true,
				detail: {item, column, row}
			});
			this.dispatchEvent(onTableRowCellSelected);
		}
	}

	toggleOrderField() {
		let selectedColumnClone = R.clone(this.selectedColumn);
		switch (selectedColumnClone.order) {
			case "ASC":
				selectedColumnClone.order = null;
				break;
			case "DES":
				selectedColumnClone.order = "ASC";
				break;
			default:
				selectedColumnClone.order = "DES";
				break;
		}
		return selectedColumnClone;
	}

	changeColumnOrder() {
		if (this.selectedColumn) {
			this.selectedColumn = this.toggleOrderField();
			this.columns.forEach((c) => c.order = undefined);
			const index = this.columns.findIndex((col) => col.displayName == (this.selectedColumn.displayName || ""));
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
		if(!this.selectedColumn.order) {
			return this.source;
		}
		const order = this.selectedColumn.order == "ASC" ? R.ascend : R.descend;
		return R.sort(order(this.selectedColumn.orderCellValue || R.prop(this.selectedColumn.property)))(this.orderedList);
	}

	sourceChanged() {
		this.orderedList = this.source;
		if (this.selectedColumn) {
			if(this.columns){
				this.columns.forEach((column, index) => {
						if(column.property == this.selectedColumn.property){
								this.columns[index] = this.selectedColumn;
						}
				});
		}
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

	renderValue(item, property){
		if(item[property] != undefined && item[property] != null){
			if(item[property] == 0 && typeof(item[property]) == "number"){
				return "0";
			}
			return item[property];
		}
		return "";
	}

	orderedListChanged(){
		this.virtualizeList = this.orderedList.map((item) => {
			return {item, renderCard: this.renderCard, columns: this.columns, renderValue: this.renderValue };
		});
	}

	columnsChanged(){
		this.virtualizeList = this.orderedList.map((item) => {
			return {item, renderCard: this.renderCard, columns: this.columns, renderValue: this.renderValue };
		});
	}


	render() {
		return html`${template(this)}`;
	}

	static get styles() {
		return css`${unsafeCSS(styles)}`;
	}

}


