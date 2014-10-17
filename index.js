#!/usr/bin/env node

'use strict';

var fs      = require('fs')
var path    = require('path')
var program = require('commander')
var pjson   = require('./package.json')
var chalk   = require('chalk')

function list(val) {
  return val.split(',')
}

program
  .version(pjson.version)
  .usage('[options] <dir>')

program
  .option('-t, --types <types>', 'Add an input file type or types eg. -t .css,.html', list)
  .option('-d, --dirs <dirs>', 'Add an input directory or directories to include eg. -d css,templates', list)

program.parse(process.argv)

//error if <dir> has not been passed
if (program.args.length !== 1) {
  console.error(Error(chalk.red('<dir> must be passed to jsonbundle command')))
  process.exit(1)
}

program.dirs = program.dirs || []
program.types = program.types || []

//get remaining unparsed args
var baseDirectory = (program.args[0].indexOf('/') === 0) ?
  program.args[0] : path.join(process.cwd(), program.args[0])

var directories = program.dirs.map(function (directory) {
  //if directory or output file begin with / then we assume absolute pathing
  return (directory.indexOf('/') === 0) ? directory : path.join(baseDirectory, directory)
})

directories.unshift(baseDirectory)

//if no file types have been defined, default to .json files
var types = (program.types.length > 0) ? program.types : ['.json']

var assetBundle = {}

function bundle(directory, assetType) {
  var bundleKey = assetType.replace('\.', '')
  assetBundle[bundleKey] = assetBundle[bundleKey] || {}

  var files = fs.readdirSync(directory)

  files.forEach(function(file) {
    if (path.extname(file) === assetType) {
      var contents = fs.readFileSync(path.join(directory, file), 'utf-8')
      var filename = path.basename(file)

      assetBundle[bundleKey][filename] = contents
    }
  })
}

// Loop over each additional directory...
directories.forEach(function (directory) {

  //...and bundle files of each type
  types.forEach(function (type) {
    bundle(directory, type)
  })
})

// Output the bundled json file
process.stdout.write(JSON.stringify(assetBundle, null, 2))



