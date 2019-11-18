import {UxlGridDemo} from "./uxl-grid-demo/uxl-grid-demo";

const grid = new UxlGridDemo();

const content = document.querySelector(".content");
content.appendChild(grid as any);
