import {html, LitElement, property, customElement, css, unsafeCSS} from 'lit-element';
import {template} from './template';
import styles from './styles.scss';
import {listen, propertiesObserver} from "@uxland/uxl-utilities";
import * as R from "ramda";
import {IColumns} from "../../domain";

// @ts-ignore
@customElement('format-grid')
export class FormatGrid extends propertiesObserver(LitElement) {
	
	@property()
	public source: any[] = [];
	
	@property()
	public orderedList: any[] = [];
	
	@property()
	public columns: IColumns[] = [];
	
	@property()
	public numberColumns: number;
	
	@property()
	public showHeader: boolean = true;
	
	@property()
	private selectedColumn: IColumns;
	
	static get styles() {
		return css`${unsafeCSS(styles)}`;
	}
	
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
	
	firstUpdated() {
		this.orderedList = this.source;
	}
	
	sourceChanged() {
		this.orderedList = this.source;
		if (this.selectedColumn) {
			this.orderedList = this.sortColumn();
		}
	}
	
	render() {
		return html`${template(this)}`;
	}
}
