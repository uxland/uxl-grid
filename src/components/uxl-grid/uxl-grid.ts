import { listen, propertiesObserver } from "@uxland/uxl-utilities";
import { css, customElement, html, LitElement, property, query, unsafeCSS } from "lit-element";
import styles from "./styles.scss";
import { template } from "./template";
import * as R from "ramda";


export interface IColumns {
  property: string;
  displayName: string;
  order?: IOrder;
}

export type IOrder = "ASC" | "DES";
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

  @listen("click", ".table__header-cell")
  public onClickHeaderCell(event){
    let htmlElement: HTMLElement = event.currentTarget;
    if(htmlElement) this.selectedColumn = JSON.parse(htmlElement.dataset['column']);    
    this.orderedList = this.sortColumn();
  }

  @listen("click", ".table__row-cell")
  public onClickTableRowCell(event){
    let htmlElement: HTMLElement = event.currentTarget;
    let item =  JSON.parse(htmlElement.dataset['item']);  
    if(item) {
      const onTableRowCellSelected = new CustomEvent("uxl-grid-row-cell-selected", {
        composed: true,
        detail: { item }
      });
      this.dispatchEvent(onTableRowCellSelected);
    }
  }

  toggleOrderField(){
    let selectedColumnClone = R.clone(this.selectedColumn);
    if(!selectedColumnClone.order || selectedColumnClone.order == "ASC"){
      selectedColumnClone.order = "DES";
    }else{
      selectedColumnClone.order = "ASC";
    }
    return selectedColumnClone;
  }

  changeColumnOrder(){
    if(this.selectedColumn){
      this.selectedColumn = this.toggleOrderField();
      this.columns.forEach((c) => c.order = undefined);
      const index = this.columns.findIndex((col)=> col.property == this.selectedColumn.property);
      if(index > -1){
        return R.pipe(
          R.remove(index, 1),
          R.insert(index,<any> this.selectedColumn)
        )(this.columns)
      }
    }
    return this.columns
  }

  sortColumn(){
    this.columns = this.changeColumnOrder();
    if(!this.selectedColumn.order || this.selectedColumn.order == "ASC" ){
      return R.sort(R.ascend(R.prop(this.selectedColumn.property)))(this.orderedList);
    }
    return R.sort(R.descend(R.prop(this.selectedColumn.property)))(this.orderedList);
  }

  firstUpdated(){
    this.orderedList = this.source;
  }

  sourceChanged(){
    this.orderedList = this.source;
    if(this.selectedColumn){
      this.orderedList = this.sortColumn();
    }
  }

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
