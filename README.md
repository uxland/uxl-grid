# UXL Grid  [![npm version](https://badge.fury.io/js/%40uxland%2Fuxl-grid.svg)](https://badge.fury.io/js/%40uxland%2Fuxl-grid)

| Build Status                                                                                                                  | Statements                                    | Branches                                  | Functions                                   | Lines                               |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------- | ------------------------------------------- | ----------------------------------- |
| [![Build Status](https://api.travis-ci.org/uxland/uxl-gridsvg)](https://api.travis-ci.org/uxland/uxl-grid) | ![Statements](#statements# 'Make me better!') | ![Branches](#branches# 'Make me better!') | ![Functions](#functions# 'Make me better!') | ![Lines](#lines# 'Make me better!') |

## Installation

`npm i @uxland/uxl-grid`


##### How to use

```
<body>
    <uxl-grid></uxl-grid>
</body>

```

#### Properties

The following properties can be used to set up the component information

| Property name                     | Description                           |
|-----------------------------------|---------------------------------------|
| `source`                           | Source data for the table. Need to be an array |
| `columns`                         | That property defines the table columns to display, the property name of the data source item, the display name of the table  & the initial sort mode ("ASC or "DES") (optional). Need to be an array  `[{property: string; displayName: string; order?: IOrder;}]`|
| `renderCard`                         | Optional. This property sets a function that accepts the item as a parameter and return the html that will be  rendered as the contents of  the card that replaces the row when media query is phone size|
| `showHeader` | That property allow control the table header visibility. Default `true` | 

#### Column options

| Property name                     | Description                           |
|-----------------------------------|---------------------------------------|
|    property                       | Property name value of the data source |
|	displayName                     | Required.Display name of the table |
|	order                           | Optional. Initial sort mode. Values: "ASC" or "DESC" |
|	renderCell                      | Optional. Function that receives item as a parameter and should return the html that should be rendered in that column for that item.Example: *(item) => html`${items.price}€`* In case, renderCell is not informed the property value will be rendered.|
|	orderCellValue                  | Optional. Function that receives item as a parameter and should return the value of the cell when. Example: *(item) => item.name.length*. In case, orderCellValue is not informed the property value will be used to order|

##### Styling

The following custom parts are available for styling

| Css part name              | Description                      |
|----------------------------|----------------------------------|
| `table`                    | Customize table tag              |
| `table__header`            | Customize table header           |
| `table__header_cell`       | Customize table header cell      |
| `table__row`               | Customize table row for boy table|
| `table__row-cell`          | Customize table row cell         |


##### Events

The following custom events are available to listen

| Event name                    | Description                       |
|-------------------------------|-----------------------------------|
| `uxl-grid-row-cell-selected`  | Click event in a table body row cell  |
| `uxl-grid-content-cell-selected` | Click event in a content cell  |


