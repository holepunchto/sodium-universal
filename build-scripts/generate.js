#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const dir = path.dirname(require.resolve('sodium-javascript/package.json'))

const ls = fs.readdirSync(dir)
const tmp = `module.exports = require('sodium-native')\n`

for (const file of ls) {
  if (!/\.js$/i.test(file)) continue
  if (file === 'example.js') continue
  if (file === 'test.js') continue

  fs.writeFileSync(path.join(__dirname, '..', file), tmp.replace('{file}', file))
}

const pkg = require('sodium-javascript/package.json')
const myPkg = require('../package.json')

for (const key of Object.keys(pkg.dependencies)) {
  myPkg.dependencies[key] = pkg.dependencies[key]
}

fs.writeFileSync(path.join(__dirname, '../package.json'), JSON.stringify(myPkg, null, 2) + '\n')
