import {html, unsafeCSS} from 'lit-element/lit-element';
import { UxlGridDemo } from "./uxl-grid-demo";
import "../../src/components/uxl-grid/uxl-grid";
import styles from "./styles.scss";

export const template = (props: UxlGridDemo) => html`
     <div class="demo">
        <uxl-grid extraStyles="${unsafeCSS(styles)}" .renderCard=${() => html`Hellow`} .source="${props.source}" .columns="${props.columns}"></uxl-grid>
   </div>
`
