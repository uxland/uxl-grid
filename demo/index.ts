import { UxlGrid } from "../src/components/uxl-grid/uxl-grid";
const grid = new UxlGrid();

const items = [
    {
    id: 1,
    nombre: "AAACampo1",
    apellido:"CCCApellido1",
    edad: 23
},
    {
    id: 1,
    nombre: "LLCampo2",
    apellido:"MMMApellido2",
    edad: 23
},
{
    id: 1,
    nombre: "YYYCampo6",
    apellido:"AAAApellido6",
    edad: 23
},
    {
    id: 1,
    nombre: "RRCampo3",
    apellido:"LLLApellido3",
    edad: 23
},
    {
    id: 1,
    nombre: "DFGCampo4",
    apellido:"HHGGApellido4",
    edad: 23
},
    {
    id: 1,
    nombre: "RTTCampo5",
    apellido:"LLKKApellido5",
    edad: 23
},
    {
    id: 1,
    nombre: "EEECampo7",
    apellido:"ALDKApellido7",
    edad: 23
}
];

const columns = [
    {
        property: "edad",
        displayName: "Edad de la persona"
    },
    {
        property: "nombre",
        displayName: "Nombre de la persona"
    },
    {
        property: "apellido",
        displayName: "Appellido de la persona"
    }
];

grid.source = items;
grid.columns = columns;

const content = document.querySelector(".content");
content.appendChild(grid as any);