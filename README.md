# Troposphere

A CLI tool to bootstrap and manage our projects' front-end.

** This project is still in development **

## Installation

Simply install it globally on your system :

```
npm install -g "github:WandiParis/troposphere"
```

## Usage

There are two main aspects when using troposphere :

* initialization : generate directory structure, files and install dependencies
* management : generate components and/or pages

### `init`

To initialize your project, type the following :

```
troposphere init
```

This will generate the directory structure and all the files you need. It will
also install some gulp tasks and their dependencies.

### `generate <component|page> <name>`

To generate the CSS and JS file for a component or a page, type the following :

```
troposphere generate component Slider
```

or

```
troposphere generate page Home
```

Your can also ask troposphere to auto import your newly generated files with the
`--import` option :

```
troposphere generate component Slider --import
```

This will generate the CSS and JS files, but also do the following things :

* add `@import "slider"` statement in `assets/scss/components/_index.scss`
* add `import Slider from "./components/slider"` in `assets/js/global.js`
* instantiate your component automatically on elements that match this selector
: `.js-slider[data-auto-instantiate]`