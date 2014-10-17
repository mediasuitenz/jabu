jabu
====

**J**son **A**sset **BU**ndler

[![NPM](https://nodei.co/npm/jabu.png)](https://nodei.co/npm/jabu/)

[![Media Suite](http://mediasuite.co.nz/ms-badge.png)](http://mediasuite.co.nz)

## Description

Bundles various asset files (html, css, js, anything) into a single json string

## Installation

```
npm install -g jabu
```

## Usage

```
jabu -h

Usage: jabu [options] <dir>

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -t, --types <types>  Add an input file type or types eg. -t .css,.html
    -d, --dirs <dirs>    Add an input directory or directories to include eg. -d css,templates
```

### --types

A comma separated list of file extensions including the .
eg. .html,.css,.json

Defaults to .json

### --dirs
A comma separated list of directories to include. Accepts both relative and absolute paths.
If path is relative, it is relative to the jabu `<dir>` parameter.

## Examples

```
//defaults to bundling .json files and outputs as a string
jabu assets

//bundles css files in assets dir and outputs as a string
jabu -t .css assets

//bundles css and html files in assets, assets/css and assets/html and writes to
//output.json
jabu -d css,html -t .css,.html assets > output.json
```

Example output:
```
{
  "html": {
    "layer1.html": "<h1>{{highway}}</h1>\n{{junction}}<br>..."
  },
  "css": {
    "layer1.css": "h1 {\n  color:blue;\n}\n"
  },
  "json": {
    "key.json": "{\n  \"domElementId\": ...",
    "map.json": "{\n  \"domElementId\": ..."
  }
}
```