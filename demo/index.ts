import {UxlGrid} from "../src/components/uxl-grid/uxl-grid";

const grid = new UxlGrid();

const items = [
	{
		id: 1,
		nombre: "Campo 1",
		apellido: "Apellido 1",
		edad: 23
	},
	{
		id: 1,
		nombre: "Campo 2",
		apellido: "Apellido 2",
		edad: 23
	},
	{
		id: 1,
		nombre: "Campo 3",
		apellido: "Apellido 3",
		edad: 23
	},
	{
		id: 1,
		nombre: "Campo 4",
		apellido: "Apellido 4",
		edad: 23
	},
	{
		id: 1,
		nombre: "Campo 5",
		apellido: "Apellido 5",
		edad: 23,
		disabled: true
	},
	{
		id: 1,
		nombre: "Campo 6",
		apellido: "Apellido 6",
		edad: 23
	},
	{
		id: 1,
		nombre: "Campo 7",
		apellido: "Apellido 7",
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
		displayName: "Apellido de la persona"
	}
];

grid.source = items;
grid.columns = columns;
grid.isFormatGrid = true;

const content = document.querySelector(".content");
content.appendChild(grid as any);
