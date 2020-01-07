import {html} from 'lit-element/lit-element';
import { UxlGridDemo } from "./uxl-grid-demo";
import "../../src/components/uxl-grid/uxl-grid";

export const template = (props: UxlGridDemo) => html`
     <div class="demo">
        <uxl-grid .source="${props.source}" .columns="${props.columns}"></uxl-grid>
   </div>
`
