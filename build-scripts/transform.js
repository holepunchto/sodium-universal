const fs = require('fs')
const path = require('path')
const { Transform, PassThrough } = require('stream')
const resolve = require('resolve')

module.exports = function (file, opts) {
  const basedir = path.dirname(file)
  const name = path.basename(file)

  if (opts._flags.browserField === false) {
    return new PassThrough()
  }

  return new Transform({
    transform (data, enc, cb) {
      cb()
    },
    flush (cb) {
      const m = 'sodium-javascript/' + name
      resolve(m, { basedir }, (err, file) => {
        if (err) return cb(err)
        fs.readFile(file, (err, buf) => {
          if (err) return cb(err)
          this.push(buf)
          cb(null)
        })
      })
    }
  })
}
