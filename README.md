# Troposphere

A CLI tool to bootstrap and manage our projects' front-end.

[![npm version](https://badge.fury.io/js/%40wandiparis%2Ftroposphere.svg)](https://badge.fury.io/js/%40wandiparis%2Ftroposphere)
[![Build Status](https://travis-ci.org/WandiParis/troposphere.svg?branch=master)](https://travis-ci.org/WandiParis/troposphere)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Installation

Simply install it globally on your system :

```
npm install -g @wandiparis/troposphere
```

## Commands

There are two main aspects when using troposphere :

* initialization : generate directory structure, files and install dependencies
* management : generate components and/or pages

### `init [--skip-deps]`

To initialize your project, type the following :

```
troposphere init
```

This will generate the directory structure and all the files you need. It will
also install some gulp tasks and their dependencies.

Alias : `i`

#### Options

`-s, --skip-deps`

Will skip dependencies installation process. If you add this option, the command will finish faster, but you will have to run `npm install` manually to be able to use `npm start` or `npm run compile` commands.

### `generate <component|page> <name> [--import] [--style] [--script]`

To generate the CSS and JS file for a component or a page, type the following :

```
troposphere generate component Slider
```

or

```
troposphere generate page Home
```

Alias : `g`


#### Options

`--import`

Auto import your newly generated files. For example, if you run `troposphere generate component Slider --import`, it will do the following :

* add `@import "slider"` statement in `assets/scss/components/_index.scss`
* add `import Slider from "./components/slider"` in `assets/js/global.js`
* instantiate your component automatically on elements that match this selector
: `.js-slider[data-auto-instantiate]`

`--style`

Generate (and import, if you provided `--import` option) only style files.

`--script`

Generate (and import, if you provided `--import` option) only script files.

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
