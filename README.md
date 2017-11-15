# Troposphere

[![Build Status](https://travis-ci.org/WandiParis/troposphere.svg?branch=master)](https://travis-ci.org/WandiParis/troposphere)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A CLI tool to bootstrap and manage our projects' front-end.

## Installation

Simply install it globally on your system :

```
npm install -g @wandiparis/troposphere
```

## Commands

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

Alias : `i`

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

If you want to generate only CSS or JS files, you can use `--style` or
`--script` options. But by default, both files will be generated.

Alias : `g`

### `help [command]`

Get some help about the CLI or a specific command by providing its name.

## Options

### `-h`, `--help`

Display help about the CLI

### `-V`, `--version`

Display the version of troposphere currently installed on your system

### `no-color`

Disable colors

### `--quiet`

Only display warn and error messages

### `-v`, `--verbose`

Output all messages, including debug messages
