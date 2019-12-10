import {html} from 'lit-element/lit-element';
import { UxlGridDemo } from "./uxl-grid-demo";
import "../../src/components/uxl-grid/uxl-grid";

export const template = (props: UxlGridDemo) => html`
   <div class="demo">
        <h2>HML Table Mode (default)</h2>
        <uxl-grid .source="${props.source}" .columns="${props.columns}"></uxl-grid>
   </div>
     <div class="demo">
        <h2>CSS Grid Mode</h2>
        <uxl-grid .source="${props.source}" .columns="${props.columns}" .isFormatGrid="${true}" .showHeader="${props.showHeader}"></uxl-grid>
   </div>
`
