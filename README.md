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
| `columns`                         | That property defines the table columns to display, the property name of the data source item, the displat name of the table  & the initial order (optional). Need to be an array  `[{property: string; displayName: string; order?: IOrder;}]`|
| `showHeader` | That property allow control the table header visibility. Default `true` | 


##### Styling

#####Stylable Shadow Parts
The following styleable part's of the element `uxl-grid` are available for styling:

| Shadow tree part                                     | Description                         | Style outside of shadow tree                     |
| ---------------------------------------------------- | ----------------------------------- | ------------------------------------------------ |
| `<div class="header" part="header">...`     | Customize header row grid  | `uxl-grid::part(header) {...}`    |
| `<div id="header-cell-${index + 1}" part="header__cell-${index + 1}">...`      | Customize header cell grid   | `uxl-grid::part(header__cell-${index+1)) {...}`   |
| `<div id="row-${index + 1}" part="content__row">...`      | Customize table row for boy table   | `uxl-grid::part(content__row) {...}`   |
| `div id="column-${index + 1}" part="content__cell-${index + 1}">...`      | Customize table row cell   | `uxl-grid::part(content__cell-${index+1) {...}`   |

#####Mixins
The following custom properties and mixins are available for styling:

| Custom property                                | Description                                          | Default             |
| ---------------------------------------------- | ---------------------------------------------------- | ------------------- |
| `--uxl-grid-gap`                              | Gap of the grid               | `16px`              |
| `--uxl-grid-order-icon-color`                  | The color of the order icons               | `blue`              |
| `--uxl-grid-row-hover-color`                   | The background color of hover row               | `lightcyan`         |
| `--uxl-grid-row-disabled-color`                | The background color of disabled row              | `lightcyan`         |

##### Events

The following custom events are available to listen

| Event name                    | Description                       |
|-------------------------------|-----------------------------------|
| `uxl-grid-row-cell-selected`  | Click event in a table body cell  |


